# iemhacks_Code_Hikerz
GitHub Repo of team Code_Hikerz for IemHacks 2.0

## ⚓ Our Team Members
👨🏻‍💻 <u>Rajarshi Dutta</u> - **`goblin45`**

Find his profile here - *`https://github.com/goblin45`*

👩🏻‍💻 <u>Shreya Ganguly</u> - **`Srinkk`**

 Find her profile here - *`https://github.com/Srinkk`*

👩🏻‍💻 <u>Ishika Ghosh</u> - **`ishikag123`**

Find her profile here - *`https://github.com/ishikag123`*

## ⚓ Problem Statement
At present, parents don’t get time to pay enough attention to the children, especially when it comes to their mental health. And even for the adults, feelings of being excluded, unattended by the loved ones, problems/stress at work etc. can start to develop serious illnesses in their subconscious minds. 
Most of the time people don’t even know that they are suffering from depression. 
Therefore our team felt the need of a solution that can track a person's online searches and detect any mental instability in a very early stage and let his/her family know that something is not right with him/her.


## ⚓ Project Installation Setup
As our project is created with MERN stack, both frontend and backend are running in Node.js runtime except the Flask servers we have used.

### 💻 <u>Repository Setup</u>:

1. Fork our repo into your own github.
2. Connect the forked repo with a new folder in your local. In your terminal, run - 
```
git remote add origin https://github.com/goblin45/iemhacks_Code_Hikerz-.git
```
3. Pull all the directories and files into your project folder: 

```
git pull origin main
```

### 💻 <u>How to Setup The Frontend</u>:

1. Navigate to the `Frontend` folder in your terminal and run -

```
npm init
```

This will install all the dependencies mentioned in the `package.json` of the `Frontend`.

2. To launch the frontend server, please run - 

```
npm start
```

This will start the server at local port `3000`.

### 💻 <u>How to Setup the Node Backend</u>:

1. Navigate to the `Backend/Node` folder in your terminal and run - 

```
npm init
```

This will install all the dependencies mentioned in the `package.json` of the `Backend/Node`.

2. To launch the Node Backend server, please run - 

```
nodemon 
```

`or`

```
npm run dev
```

This will start the Node Backend server with which the frontend will communicate at local port `3500`.

### 💻 <u>How to setup the Flask Backend</u>:

1. Navigate to the `Backend/Flask` folder in your terminal and run these following commands one by one -

```
pip install flask
```

```
pip install flask_cors
```

```
pip install google-api-client
```

```
pip install langdetect
```

```
pip install transformers
```

```
pip install scipy
```

```
pip install torch
```

2. Run these five Flask servers in dedicated terminals for each:

- app.py (port - `5000`)
- processor.py (port - `5001`)
- videoApi.py (port - `5002`)
- booksApi.py (port - `5003`)
- musicApi.py (port - `5004`)

### 💻 <u>How to setup the Extension</u>:

Though this setup is optional, but integrating it makes the project go one step further.

1. To download the extension zip folder, <u>[click here](https://github.com/goblin45/Mental_App_Dev_Static/releases/download/v1.0.0/Extension.zip)</u>.

2. Right click on the downoaded zipped folder and select extract all. 

3. Go to `Chrome's Extension Manager` or enter `chrome://extensions` in your browser address bar.

5. Turn on `Developer mode` at the top right corner of your browser window.

6. Drag and drop the extracted folder into the `Extension Manager` window and the extension will start working.

**We appreciate your patience. Hope you will like the project.**

**Thanks for staying tuned!**

#
