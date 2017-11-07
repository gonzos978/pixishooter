/**
 * Created by adnan on 11/3/2017.
 */
var xmlLoader=new XMLHttpRequest();

xmlLoader.onload=function(){

    console.log('data loaded...'+xmlLoader.responseXML.documentElement.nodeName.childNode);
    var parser = new DOMParser();
    var xmlData=parser.parseFromString(xmlLoader.responseXML.documentElement,"text/xml");
    console.log(xmlData.childNodes[0]);
}

xmlLoader.open("GET","assets/data.xml");
xmlLoader.responseType="Document";
xmlLoader.send();