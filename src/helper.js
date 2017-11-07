/**
 * Created by adnan on 11/6/2017.
 */
function include(filename)
{
    var body = document.getElementsByTagName('head').item(0);
    script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    body.appendChild(script)
}

function test()
{
 console.log("Foo Helper");
}