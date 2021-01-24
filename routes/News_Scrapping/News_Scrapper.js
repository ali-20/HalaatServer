var axios= require('axios');
var cheerio=require('cheerio');


async function News_Scrapper(){

    
    var newsStory=[
                   
    ]

    await axios.get("https://www.mangobaaz.com/trending").then(
        (res)=>{

            

            if(res){

                
                
                

                try{

                const $ = cheerio.load(res.data);
                const articles=$(".leading-normal").children('div').children("div");
                const articleschilds=articles["children"]().children("a")
                const articleschildschild=articleschilds.children("div")
                const articleschildschildchild=articles.children("a").last("div").find("a").text()
    

                
                //extracting links and images and titles

                
                for (var i=0; i<articleschilds.length; i++){
                    
                    var link={"link":"https://www.mangobaaz.com"+articleschilds[i]["attribs"]["href"],
                                "image":articleschildschild[i]["attribs"]["style"].substring(21,articleschildschild[i]["attribs"]["style"].length-2),
                                "title":$(articleschilds[i]).parent().children().next().find("h1").html()
                
                }


                    newsStory.push(link)

                    
                }

                }

                catch(err){

                    throw err;

                }

                

            }


            

        }

        
    )

    return newsStory;
}

module.exports=News_Scrapper;