echo "-------------------------------------------------"
echo "Installing dependencies in the backend directory"
echo "-------------------------------------------------"

sleep 1

cd backend
npm install

echo "-------------------------------------------------"
echo "Creating a .env file"
echo "-------------------------------------------------"

sleep 1

echo -e "STEAM_API_KEY=\n" > .env

cd ..
echo "-------------------------------------------------"
echo "Installing dependencies in the frontend directory"
echo "-------------------------------------------------"

sleep 1

cd frontend
npm install

cd ..

exec bash