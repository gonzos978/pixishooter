/**
 * Created by adnan on 11/7/2017.
 */
function Mutils(){}

Mutils.prototype.randomRange = function(min,max)
{

    return Math.floor(Math.random()*(max-min))+min;
}