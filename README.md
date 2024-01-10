## how to run react and backend at the same time ?

- `npm i concurrently` install in root folder
- then in the frontend `package.json` file do below changes
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "server": "cd server && npm run dev",
    "dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm start\" \"npm run server\""
  },
```
- then `npm run dev` to start both at the same time with single command

## 
