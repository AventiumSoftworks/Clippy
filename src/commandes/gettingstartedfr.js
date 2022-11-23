module.exports = {
    "title": "La meilleure façon de commencer à utiliser le Helios Launcher",
    "description": "Explique comment commencer à utiliser le Helios Launcher",
    "fields": [
        {
            "title": "Assurez-vous d'avoir les éléments suivants installés ou prêts:",
            "description": "Vous devez avoir des compétences de base en **git** et en **javascript** et: \n > JDK 8 ou supérieur installé: https://www.openlogic.com/openjdk-downloads \n > Cloner le Helios Launcher et Nebula, (et utiliser la branche 1.17+ pour minecraft 1.17 ou supérieur) \n > Un **serveur web**, vous ne pouvez pas utiliser un serveur minecraft pour servir les fichiers"
        },
        {
            "title": "Configuration du Helios Launcher",
            "description": "Tout d'abord, vous devez configurer le Helios Launcher, suivez simplement les instructions sur la page github du helioslauncher: https://github.com/dscalzi/HeliosLauncher et exécutez le lanceur à l'aide de `npm run start`. Si c'est fait correctement, vous devriez voir le lanceur s'ouvrir. \n Veuillez exécuter `/microsoft(fr)` pour modifier les paramètres d'oauth2 microsoft."
        },
        {
            "title": "Configuration de Nebula",
            "description": "Maintenant, vous devez configurer Nebula (1.17), suivez simplement les instructions qui vous sont données à l'aide de `/nebula(fr)` \n > Veuillez noter que vous devez créer un fichier .env et modifier les variables, et le rendre que `BASE_URL` est votre adresse de serveur web! \n > N'utilisez pas une version plus récente de java que votre lanceur n'utilise, sinon cela ne fonctionnera pas!"
        },
        {
            "title": "Configuration du serveur web",
            "description": "Copiez les éléments suivants de votre dossier `ROOT` vers le serveur web, \n > Les dossiers: repo, servers \n > Le fichier: distribution.json"
        },
        {
            "title": "Dernières étapes",
            "description": "Maintenant, vous devez exécuter le lanceur, et vous devriez pouvoir jouer sur votre serveur! \n Construisez le lanceur pour vos clients et vous êtes prêt à partir! \n > Si vous rencontrez des problèmes, veuillez nous contacter ici dans le serveur discord"
        }
    ]
}
