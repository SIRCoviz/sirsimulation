{-# LANGUAGE DataKinds             #-}
{-# LANGUAGE DeriveAnyClass        #-}
{-# LANGUAGE DeriveGeneric         #-}
{-# LANGUAGE FlexibleInstances     #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings     #-}
{-# LANGUAGE RankNTypes            #-}
{-# LANGUAGE ScopedTypeVariables   #-}
{-# LANGUAGE TypeOperators         #-}
module Main where

import           Control.Monad.Except
import           Control.Monad.Reader
import           Data.Aeson
import qualified Data.Aeson.Parser
import           Data.Aeson.Types
import qualified Data.Array                    as A
import           Data.Attoparsec.ByteString    hiding (take)
import           Data.ByteString               (ByteString)
import           Data.List
import           Data.Maybe
import           Data.String.Conversions
import           Data.Time.Calendar
import           GHC.Generics
import           Lucid
import           Network.HTTP.Media            ((//), (/:))
import           Network.Wai
import           Network.Wai.Handler.Warp
import           Network.Wai.Middleware.Cors   (simpleCors)
import           Prelude                       ()
import           Prelude.Compat
import           Servant
import           Servant.Types.SourceT         (source)
import           System.Directory
import           System.Random
import           Text.Blaze
import qualified Text.Blaze.Html
import           Text.Blaze.Html.Renderer.Utf8

data SIRD = Susceptible | Infected | Recovered | Dead deriving (Generic, ToJSON, Enum, Read, Show, Eq, Ord)

newtype C19State = S [[SIRD]] deriving (Generic, ToJSON)

data InitialState = IS
    { initialCases :: Int
    , scaling      :: Int
    } deriving Generic

instance ToJSON InitialState

data Step = Step
    { time  :: Int
    , cells :: C19State
    } deriving (Generic, ToJSON)

type API = "initialstate" :> Capture "initialCases" Int :> Capture "scaling" Int :> Get '[JSON] [Step]

server :: Server API
server = calcState
    where calcState :: Int -> Int -> Handler [Step]
          calcState start scale = pure someSteps

simAPI :: Proxy API
simAPI = Proxy

app :: Application
app = serve simAPI server

main :: IO ()
main = run 8080 $ simpleCors app



someSteps :: [Step]
someSteps = boringStep <$> [1..50]
    where boringStep t = Step { time = t, cells = someState }

-- start out with 50 x 50 grid
someState :: C19State
someState = S $ replicate 50 fiftycols
    where fiftycols = take 50 $ cycle [Susceptible .. Dead]

simStep :: Step -> Step
simStep (Step t cs) = Step (t+1) cs'
    where cs' = undefined -- calculateInfection cs

-- | how else to get random numbers?
-- calculateInfection :: C19State -> StdGen -> C19State
-- calculateInfection cs =
--     where ary = A.listarray ((0,0),(50,50)) (concat cs)

{-
1. look up any Infected
2. get their neighbors
3. scale number of neighbors by the input value
4. calculate who gets infected by https://en.wikipedia.org/wiki/Epidemic_models_on_lattices#SIR_model
-}
-- | 50 x 50 array of SIRD with 5 zombies
arraySteps = A.array ((0,0),(49,49)) [(ix,s) | ix <- indices , s <- take (length indices) (zombies <> public)]
    where indices = [(x,y) | x <- [0..49 :: Int], y <- [0..49 :: Int]]
          zombies = take 5 $ repeat Infected
          public = repeat Susceptible

arraySmall = A.array ((0,0),(4,4)) [(ix,s) | ix <- indices , s <- take (length indices) $ cycle [Susceptible .. Dead]]
    where indices = [(x,y) | x <- [0..4 :: Int], y <- [0..4 :: Int]]


-- | Input is size of array and location, output is neighbors without wraparound.
-- neighbors (50,50) (0,0) gives [(0,1),(1,0),(1,1)]
-- neighbors neighbors (50,50) (45,46) gives [(44,45),(44,46),(44,47),(45,45),(45,47),(46,45),(46,46),(46,47)]
neighbors :: (Int, Int) -> (Int, Int) -> [(Int, Int)]
neighbors (n, m) (i, j) = filter (\x -> inBounds x && x /= (i, j)) [ (i + di, j + dj) | di <- [-1..1], dj <- [-1..1] ]
    where inBounds (i', j') = i' < n && i' >= 0 && j' < m && j' >= 0

-- find any Infected, how to scale? TODO: remove hardcoded dimensions!
-- TODO: maybe calculate infection chance at each neighbor lookup?
getNeighbors ((x,y),Infected) = neighbors (50,50) (x,y)
getNeighbors _                = []

-- https://en.wikipedia.org/wiki/Epidemic_models_on_lattices#SIR_model
-- | each four neighbors of a cell have a chance of being infected, we're trying 0.176
possiblyInfect :: Float -> ((Int,Int),SIRD) -> ((Int,Int),SIRD)
possiblyInfect f a@((x,y),status) = if f < 0.176 then ((x,y),Infected) else a

-- just sew this next part together?
-- zipWith possiblyInfect neighbors (randomRs (0.0,1.0 :: Float) stdgen)
