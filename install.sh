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

echo -e "NODE_ENV=development\nSTEAM_API_KEY=\nFRONTEND_HOST=\n" > .env

cd ..
echo "-------------------------------------------------"
echo "Installing dependencies in the frontend directory"
echo "-------------------------------------------------"

sleep 1

cd frontend
npm install

cd ..

exec bash