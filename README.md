# CS4440-QueryProject

## Data Preparation and Setup

### Installation Instructions
1. Install Node.js from https://nodejs.org/en/download 
2. Open a terminal in desired local project directory
3. Clone the repository by running the following in Terminal:
  git clone https://github.com/isafernandeztrev/CS4440-QueryProject
4. Go to the SocialMedia.UI directory
  cd SocialMedia.UI
5. Install environment and dependencies
  npm install or npm install -g @angular/cli
  npm install @swimlane/ngx-charts d3 --save          //For the chart library
6. Run web application
  ng serve
7. In another terminal window, go to WebApplication1 directory
   cd WebApplication1
8. Install Microsoft SQL server express https://www.microsoft.com/en-us/sql-server/sql-server-downloads
9. Follow the installation instructions and install Microsoft ssms when it gives you the option
10. Open Microsoft ssms and connect to a local instance 
11. Navigate to this directory *\CS4440-QueryProject\WebApplication1\WebApplication1
12. Run this commands in order:
    dotnet dev-certs https --clean
    dotnet dev-certs https --trust
    dotnet tool install --global dotnet-ef
    dotnet ef database update
13. Build your dotnet app
  dotnet build
14. Run your dotnet app
    dotnet run
15. Visualize the dotnet endpoints at http://localhost:5064/swagger


## Aplication and Code
### Sample of the synthetic dataset and UI Rundown:
1. Choose desired Platform 
2. For the sake of this demo choose “Instagram”
3. Enter “sampleusername” as Username 
4. Enter “sampleuser@email.com” as Email
5. Enter “600” as Number of Followers
6. Enter “750” as Number of Following
7. Choose the desired date for the Current Date
8. Fill out 5 posts as “Posts” and 5 posts as “Videos” and fill in values as desired
9. Click submit to send data to database
10. Click Dashboard to go to Metrics Dashboard
11. Query through Likes per Content Type to see the total likes each content type has.
12. Query through Comments per Content Type to see the total comments each content type has.
13. Query through Follower Growth to see the visualization of follower growth trends for each platform.
