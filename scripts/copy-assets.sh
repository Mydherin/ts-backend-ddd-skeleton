#!/bin/bash
find ./src \( -name "*.yaml" -o -name "*.json" \) -exec cp --parents -t ./build/ {} +
find ./tests \( -name "*.yaml" -o -name "*.json" \) -exec cp --parents -t ./build/ {} +