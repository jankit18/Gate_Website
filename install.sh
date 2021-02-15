#!/bin/bash

sudo apt-update
echo "Y" | sudo apt install python3
sudo apt install python3-pip
pip3 install django
pip3 install djangorestframework
pip3 install -U drf-yasg 
