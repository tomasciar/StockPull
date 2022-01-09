# StockPull
A lightweight stock tracking website that saves your settings in the browser

<img width="1287" alt="stockpull" src="https://user-images.githubusercontent.com/81879857/148628848-2820e982-373f-4e48-84c8-29b8a57206b0.png">

## Backstory
I really enjoyed using the Stocks app on my iPhone, but it wasn't compatible with my Windows desktop. I found that there was not even a great way to find quick stock information on Windows in general, so I made this website to serve as my way to keep track of my stocks on all my different platforms.

## Why use StockPull?
Unlike the Stocks app for iOS and macOS, there are no easy ways to access stock information and save settings without the use of an account on Windows or other operating systems. StockPull eliminates the need for an application and an account by saving stock information on local storage in the browser. On top of this, the build is compatible with most modern browsers, so it can be used on both mobile devices and computers.

## Current support
Market data for listings on the World's top exchanges, including TSX, NYSE, NASDAQ and AMEX. Due to the limitations of the free version of the Alpha Vantage API, only 5 requests are allowed per minute. A next step that I want is to be able to see intraday stock prices.

## Quickstart guide for development
If you would like to make modifications on a local version:
- Download most recent release
- Open .zip file
- Open repository in an editor
- Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key) to claim free API key
- Enter API key in config.js
- Done 😎
