#!/bin/bash
gunicorn -k uvicorn.workers.UvicornWorker main:app
