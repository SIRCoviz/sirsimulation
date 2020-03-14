{-# LANGUAGE DataKinds                  #-}
{-# LANGUAGE DeriveAnyClass             #-}
{-# LANGUAGE DeriveGeneric              #-}
{-# LANGUAGE FlexibleInstances          #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses      #-}
{-# LANGUAGE OverloadedStrings          #-}
{-# LANGUAGE RankNTypes                 #-}
{-# LANGUAGE ScopedTypeVariables        #-}
{-# LANGUAGE TypeOperators              #-}
module Main where

import           Prelude                       ()
import           Prelude.Compat

import           Control.Monad.Except
import           Control.Monad.Reader
import           Data.Aeson
import qualified Data.Aeson.Parser
import           Data.Aeson.Types
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
import           Servant
import           Servant.Types.SourceT         (source)
import           System.Directory
import           Text.Blaze
import qualified Text.Blaze.Html
import           Text.Blaze.Html.Renderer.Utf8

data SIRD = Susceptible | Infected | Recovered | Dead deriving (Generic, ToJSON, Enum)

data C19State = S [[SIRD]] deriving (Generic, ToJSON)

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
          calcState start scale = pure $ someSteps

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
