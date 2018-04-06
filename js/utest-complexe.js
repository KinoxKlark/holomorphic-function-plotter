
console.log("=== UNIT TESTS ===");


var EPSILON = 10e-3;

/**
 * Retourne la distance entre deux complexe
 */
function dist(z1, z2) {
    var z = new Complexe(z1.x-z2.x, z1.y-z2.y);
    return z.module();
}

function toString(z) {
    if(Math.abs(z.y) < EPSILON) return z.x;
    return z.x+(z.y >= 0 ? "+":"-")+(Math.abs(z.y) == 1 ? "" : Math.abs(z.y))+"i";
}

{
    console.log("Nombres complexes");

    var NB_TESTS = 0;
    var OK_TESTS = 0;

    // Construction
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test Constructor");

        var z1 = new Complexe(0,0);
        var z2 = new Complexe(-32, 23);
        var z3 = new Complexe(0,1);

        if(z1.x != 0 || z1.y != 0)
        {
            console.error("z1 doit être 0+i0 mais vaut : "+z1.x+" + i("+z1.y+")");
            pass = false;
        }
        if(z2.x != -32 || z2.y != 23)
        {
            console.error("z2 doit être -32+i23 mais vaut : "+z2.x+" + i("+z2.y+")");
            pass = false;
        }
        if(z3.x != 0 || z3.y != 1)
        {
            console.error("z3 doit être 0+i mais vaut : "+z3.x+" + i("+z3.y+")");
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // Module
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test Module");

        var z1 = new Complexe(0,0);
        var z2 = new Complexe(1,0);
        var z3 = new Complexe(0,1);
        var z4 = new Complexe(1,1);
        var z5 = new Complexe(-1,-1);
        var z6 = new Complexe(2,4);

        if(Math.abs(z1.module() - 0) > EPSILON)
        {
            console.error("Le module de (0+i0) devrait être 0, obtenu : "+z1.module());
            pass = false;
        }
        if(Math.abs(z2.module() - 1) > EPSILON)
        {
            console.error("Le module de (1+i0) devrait être 1, obtenu : "+z2.module());
            pass = false;
        }
        if(Math.abs(z3.module() - 1) > EPSILON)
        {
            console.error("Le module de (0+i) devrait être 1, obtenu : "+z3.module());
            pass = false;
        }
        if(Math.abs(z4.module() - Math.sqrt(2)) > EPSILON)
        {
            console.error("Le module de (1+i) devrait être sqrt(2), obtenu : "+z4.module());
            pass = false;
        }
        if(Math.abs(z5.module() - Math.sqrt(2)) > EPSILON)
        {
            console.error("Le module de (-1-i) devrait être sqrt(2), obtenu : "+z5.module());
            pass = false;
        }
        if(Math.abs(z6.module() - Math.sqrt(20)) > EPSILON)
        {
            console.error("Le module de (2+i4) devrait être sqrt(20), obtenu : "+z6.module());
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // Argument
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test Argument");

        var PI = Math.PI;

        var z1 = new Complexe(1,0);
        var z2 = new Complexe(1,1);
        var z3 = new Complexe(0,1);
        var z4 = new Complexe(-1,0);
        var z5 = new Complexe(0,-1);
        var z6 = new Complexe(-1,-1);
        var z7 = new Complexe(1,-1);

        if(Math.abs(z1.argument() - 0) > EPSILON)
        {
            console.error("arg(z1) devrait être 0 - obtenu : "+z1.argument());
            pass = false;
        }
        if(Math.abs(z2.argument() - PI/4) > EPSILON)
        {
            console.error("arg(z1) devrait être PI/4 - obtenu : "+z2.argument());
            pass = false;
        }
        if(Math.abs(z3.argument() - PI/2) > EPSILON)
        {
            console.error("arg(z1) devrait être PI/2 - obtenu : "+z3.argument());
            pass = false;
        }
        if(Math.abs(z4.argument() - PI) > EPSILON)
        {
            console.error("arg(z1) devrait être PI - obtenu : "+z4.argument());
            pass = false;
        }
        if(Math.abs(z5.argument() + PI/2) > EPSILON)
        {
            console.error("arg(z1) devrait être -PI/2 - obtenu : "+z5.argument());
            pass = false;
        }
        if(Math.abs(z6.argument() + 3*PI/4) > EPSILON)
        {
            console.error("arg(z1) devrait être -3PI/4 - obtenu : "+z6.argument());
            pass = false;
        }
        if(Math.abs(z7.argument() + PI/4) > EPSILON)
        {
            console.error("arg(z1) devrait être -PI/4 - obtenu : "+z7.argument());
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    console.log("- Tests fini : "+OK_TESTS+"/"+NB_TESTS+" passés!");
    console.log("==================");

}

{
    console.log("Fonctions complexes");

    var PI = Math.PI;

    var NB_TESTS = 0;
    var OK_TESTS = 0;

    var f = null;
    var z = new Complexe(0,0);
    var w = new Complexe(0,0);

    // z
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test nombre (identité) : z");

        var f = cplx.z;

        z = new Complexe(0,0);
        if(dist(z, f.evaluate(z)) > EPSILON)
        {
            console.error("id(0) = 0, mais on a calculé : "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        if(dist(z, f.evaluate(z)) > EPSILON)
        {
            console.error("id(1) = 1, mais on a calculé : "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(-3,PI);
        if(dist(z, f.evaluate(z)) > EPSILON)
        {
            console.error("id(-3+iPI) = -3+iPI, mais on a calculé : "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // i
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test nombre : i");

        var f = cplx.i;

        z = new Complexe(0,0);
        if(dist(cplx.i.evaluate(z), new Complexe(0,1)) > EPSILON)
        {
            console.error("Le nombre i retourne la valeure "+toString(cplx.i.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // complexe
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test nombre : quelconque");

        z = new Complexe(0,0);
        f = cplx.complexe(0,0);
        if(dist(z, f.evaluate(z)) > EPSILON)
        {
            console.error("Le nombre "+toString(z)+" retourne "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(2,2);
        f = cplx.complexe(2,2);
        if(dist(z, f.evaluate(z)) > EPSILON)
        {
            console.error("Le nombre "+toString(z)+" retourne "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(-12,PI);
        f = cplx.complexe(-12,PI);
        if(dist(z, f.evaluate(z)) > EPSILON)
        {
            console.error("Le nombre "+toString(z)+" retourne "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // z+w
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : z+w");

        z = new Complexe(0,0);
        w = new Complexe(0,0);
        f = cplx.plus(cplx.z, cplx.complexe(w.x,w.y));
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")+("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(0,0);
        f = cplx.plus(cplx.z, cplx.complexe(w.x,w.y));
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")+("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,2);
        w = new Complexe(3,4);
        f = cplx.plus(cplx.z, cplx.complexe(w.x,w.y));
        if(dist(f.evaluate(z), new Complexe(4,6)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")+("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,0);
        w = new Complexe(-3,20);
        f = cplx.plus(cplx.z, cplx.complexe(w.x,w.y));
        if(dist(f.evaluate(z), new Complexe(-3,20)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")+("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // z-w
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : z-w");

        z = new Complexe(0,0);
        w = new Complexe(0,0);
        f = cplx.minus(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")-("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(2,3);
        w = new Complexe(0,0);
        f = cplx.minus(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(2,3)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")-("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,0);
        w = new Complexe(2,3);
        f = cplx.minus(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(-2,-3)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")-("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(2,3);
        w = new Complexe(2,3);
        f = cplx.minus(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")-("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(12,3);
        w = new Complexe(4,-3);
        f = cplx.minus(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(8,6)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")-("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // z*w
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : z*w");

        z = new Complexe(0,0);
        w = new Complexe(0,0);
        f = cplx.times(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")*("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(1,0);
        f = cplx.times(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")*("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(0,1);
        f = cplx.times(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,1)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")*("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        w = new Complexe(0,1);
        f = cplx.times(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(-1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")*("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(2,3);
        w = new Complexe(2,3);
        f = cplx.times(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(4-9,12)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")*("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(3,4);
        w = new Complexe(2,0);
        f = cplx.times(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(6,8)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")*("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // z/w
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : z/w");

        z = new Complexe(1,0);
        w = new Complexe(0,0);
        f = cplx.frac(cplx.z,cplx.complexe(w.x, w.y));
        if(!isNaN(f.evaluate(z).x+f.evaluate(z).y))
        {
            console.error("Une division par zéro devrait renvoyer NaN, retourne : "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,0);
        w = new Complexe(1,0);
        f = cplx.frac(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")/("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(1,0);
        f = cplx.frac(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")/("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        w = new Complexe(1,0);
        f = cplx.frac(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,1)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")/("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(0,1);
        f = cplx.frac(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,-1)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")/("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(2,0);
        f = cplx.frac(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(1/2,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")/("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(2,1);
        w = new Complexe(1,3);
        f = cplx.frac(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(1/2,-1/2)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")/("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // z^w
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : z^w");

        z = new Complexe(0,0);
        w = new Complexe(0,0);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(isNaN(f.evaluate(z).x) || dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,0);
        w = new Complexe(1,0);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,0);
        w = new Complexe(2,0);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(2,0);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        w = new Complexe(2,0);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(-1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        w = new Complexe(0,1);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        w = new Complexe(0,1);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(Math.exp(-PI/2),0)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(Math.exp(1),0);
        w = new Complexe(0,PI/2);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(0,1)) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(Math.exp(1),0);
        w = new Complexe(0,3);
        f = cplx.pow(cplx.z,cplx.complexe(w.x, w.y));
        if(dist(f.evaluate(z), new Complexe(Math.cos(3),Math.sin(3))) > EPSILON)
        {
            console.error("Erreur : ("+toString(z)+")^("+toString(w)+") = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // re
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : re");

        var f = cplx.re(cplx.z);

        z = new Complexe(0,0);
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : Re("+toString+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : Re("+toString(z)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : Re("+toString(z)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(3,2);
        if(dist(f.evaluate(z), new Complexe(3,0)) > EPSILON)
        {
            console.error("Erreur : Re("+toString(z)+") = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // im
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : im");

        var f = cplx.im(cplx.z);

        z = new Complexe(0,0);
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : Im("+toString(z)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : Im("+toString(z)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : Im("+toString(z)+") = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(3,2);
        if(dist(f.evaluate(z), new Complexe(2,0)) > EPSILON)
        {
            console.error("Erreur : Im("+toString(z)+") = "+toString(f.evaluate(z)));
            pass = false;
        }


        if(pass) OK_TESTS++;
    })();

    // module
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : module");

        var f = cplx.module(cplx.z);

        z = new Complexe(0,0);
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,1);
        if(dist(f.evaluate(z), new Complexe(Math.sqrt(2),0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // argument
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : argument");

        var f = cplx.argument(cplx.z);

        z = new Complexe(-1,0);
        if(dist(f.evaluate(z), new Complexe(PI,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        if(dist(f.evaluate(z), new Complexe(PI/2,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,1);
        if(dist(f.evaluate(z), new Complexe(PI/4,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // conjuge
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : conjuge");

        var f = cplx.conjuge(cplx.z);

        z = new Complexe(0,0);
        if(dist(f.evaluate(z), new Complexe(0,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        if(dist(f.evaluate(z), new Complexe(1,0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        if(dist(f.evaluate(z), new Complexe(0,-1)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,1);
        if(dist(f.evaluate(z), new Complexe(1,-1)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    // ln
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test fonction : ln");

        var f = cplx.ln(cplx.z);

        z = new Complexe(0,0);
        if(dist(f.evaluate(z), new Complexe(-Infinity,PI)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,0);
        if(dist(f.evaluate(z), new Complexe(Math.log(1),0)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(0,1);
        if(dist(f.evaluate(z), new Complexe(Math.log(1),PI/2)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(1,1);
        if(dist(f.evaluate(z), new Complexe(Math.log(Math.sqrt(2)),PI/4)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }
        z = new Complexe(-1,1);
        if(dist(f.evaluate(z), new Complexe(Math.log(Math.sqrt(2)),3*PI/4)) > EPSILON)
        {
            console.error("Erreur : |"+toString(z)+"| = "+toString(f.evaluate(z)));
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    console.log("- Tests fini : "+OK_TESTS+"/"+NB_TESTS+" passés!");
    console.log("==================");

}

/*
{
    console.log("Template des tests");

    var NB_TESTS = 0;
    var OK_TESTS = 0;

    // Nom du test
    (function(){
        var pass = true;
        NB_TESTS++;

        console.log("-- Test NomDuTest");

        // xxx

        if(false)
        {
            console.error("Expliquer pourquoi le test a échoué");
            pass = false;
        }

        if(pass) OK_TESTS++;
    })();

    console.log("- Tests fini : "+OK_TESTS+"/"+NB_TESTS+" passés!");
    console.log("==================");

}
//*/
