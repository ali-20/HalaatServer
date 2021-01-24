var axios =require('axios')
var cheerio= require('cheerio')



async function SearchScrap(){



    const DawnArticles=[]


    await axios.get("https://www.dawn.com/latest-news").then((res)=>{


        if(res){


            const $=cheerio.load(res.data);
            const articles=$(".box.story");
            


            articles.each((i,el)=>{

                const link=$(el).children("figure").find("a").attr('href')
                const image=$(el).children("figure").find("picture").find("img").attr('src')
                const title=$(el).children("h2").text()
                
                
                
                if(link!=undefined && image!=undefined && title!=undefined){

                    const story={
                        "link":link,
                        "image":image,
                        "title":title
                    }

                    DawnArticles.push(story)  

                }

                

                


            })


            



        }


    })


    return DawnArticles;


}


module.exports=SearchScrap;