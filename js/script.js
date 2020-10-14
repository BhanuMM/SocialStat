

$(document).ready(function(){

	var imageLink;
	var width;
	var height;
	var title;
	var totalViews;
	var totalSubscribers;
	var totalVideos;
	var channelId;
     var url;
     var desc;
     var pubdate;
     var countr;
     var uname;
     var uid;
     var vidResults=5;
     var pid;
     var videId;
     var videoTitle;

	$("form").submit(function(){
        
       
         // location.reload();
        channelId = $("#search").val();
        uname = channelId.replace(/\s/g, '');

        

        // api key : AIzaSyC0PjDtG6lKlMOxdIJb-U9GgxWXWHWMGMY

        // make a request

        url = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyC0PjDtG6lKlMOxdIJb-U9GgxWXWHWMGMY&forUsername=" + uname + "&part=snippet,contentDetails,statistics";

        $.get(url,function(data){
             
             fetchData(data);

             bindData(imageLink,width,height,title,totalSubscribers,totalViews,totalVideos,desc,pubdate,countr);

        }); 

     
        
        return false;


	});

function fetchData(data)
{
     imageLink = data.items[0].snippet.thumbnails.default.url;
    width = data.items[0].snippet.thumbnails.default.url.width;
    height = data.items[0].snippet.thumbnails.default.url.height;

    title = data.items[0].snippet.title;
    desc = data.items[0].snippet.description;
    pubdate = data.items[0].snippet.publishedAt;
    countr = data.items[0].snippet.country;

    totalSubscribers = data.items[0].statistics.subscriberCount;
    totalViews = data.items[0].statistics.viewCount;
    totalVideos = data.items[0].statistics.videoCount; 
    uid = data.items[0].id;
    pid=data.items[0].contentDetails.relatedPlaylists.uploads;
}

function bindData(imageLink,width,height,title,totalSubscribers,totalViews,totalVideos,desc,pubdate,countr)
{
     var div = document.getElementById('results');
     while(div.firstChild){
         div.removeChild(div.firstChild);
     }


	$("#thumbnail").attr("src",imageLink);
	$("#thumbnail").attr("width",width);
	$("#thumbnail").attr("height",height);
	$("#title").html(title);
	$("#subscribers").html( totalSubscribers);
	$("#totalViews").html( totalViews);
     $("#totalVideos").html( totalVideos);
     $("#desc").html( desc);
     $("#pubdate").html( pubdate);
     $("#countr").html( countr);

     document.getElementById("thistry").onclick = function() {
          location.href = "https://youtube.com/channel/"+uid}
          document.getElementById("thistry").disabled = false;  
          document.getElementById("disp").disabled = false;
      

       document.getElementById("disp").onclick = function() {
          getVids(pid); 
       }
}


function getVids(pid)
{
     $.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",{
               part: 'snippet',
               maxResults: vidResults,
               playlistId: pid,
               key:'AIzaSyC0PjDtG6lKlMOxdIJb-U9GgxWXWHWMGMY'
          },
          function(data){
               var output;

               $.each(data.items, function(i,item){
                    
                    console.log(item);
                    videoTitle=item.snippet.title;
                    videId=item.snippet.resourceId.videoId;
                   //alert(i+":"+videoTitle);
                   output ='<div class="col-sm-4"><iframe width="400px" height="300px" src="https://www.youtube.com/embed/'+videId+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>';
                   $("#results").append( output);   


              
               }) 
          }
     );
}

});