module.exports = {
	"title": "The best way to start using the Helios Launcher",
	"description": "Explains how to get started with the Helios Launcher",
	"fields": [
		{
			"title": "Make sure you have the following installed or ready:",
			"description": "You need to have some basic **git** and **javascript** programmings skills and: \n > JDK 8 or higher installed: https://www.openlogic.com/openjdk-downloads \n > Cloned the Helios Launcher and Nebula, (and using branch 1.17+ for minecraft 1.17 or higher) \n > A **webserver**, you can't use a minecraft server to serve the files"
        },
        {
            "title": "Helios Launcher setup",
            "description": "First of all you need to setup the Helios Launcher, simply follow the instructions on the helioslauncher github page: https://github.com/dscalzi/HeliosLauncher and run the launcher using `npm run start`. If done correctly you should see the launcher open up. \n Please run `/microsoft(fr)` for changing the microsoft oauth2 settings." 
        },
        {
            "title": "Nebula setup",
            "description": "Now you need to setup Nebula (1.17), simply follow the instructions that are given using `/nebula(fr)` \n > Please not that you need to create a .env file and change the variables, and make it that `BASE_URL` is your webserver adress! \n > Don't use a newer version of java than your launcher is using, otherwise it will not work!"
        },
        {
            "title": "Webserver setup",
            "description": "Copy the following items from your `ROOT` folder to the webserver, \n > The folders: repo, servers \n > The file: distribution.json"
        },
        {
            "title": "Final steps",
            "description": "Now you need to run the launcher, and you should be able to play on your server! \n Build the launcher for your clients and you are ready to go! \n > If you have any issues, please contact us here in the discord server"
        }
    ]
}