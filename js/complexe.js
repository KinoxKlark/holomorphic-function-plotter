
//////////////////
// Nombre complexe
//////////////////

/**
 Represente un nombre complexe
 */
var Complexe = function(x,y) {
    this.x = x;
    this.y = y;
};

/**
 Retourne le module d'un complexe
 */
Complexe.prototype.module = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

/**
 Retourne l'argument d'un complexe
 */
Complexe.prototype.argument = function() {
    if(this.y == 0 && this.x <= 0) return Math.PI;
    return 2*Math.atan(this.y/(this.x+this.module()));
};

//////////////////
// Fonctions complexe
//////////////////

/*
    A faire :
    +
    -
    *
    /
    sin
    cos
    tan
    sinh
    cosh
    tanh
    exp
    ln
    re (partie réel)
    im (partie imaginaire)
    module
    arg

    pow

    sum
    integral
    derivee
    limite
*/

var cplx = function(){

    var PriorityEnum = {
        NONE = 0,
        ADDITION_SUBSTRACTION = 1,
        MULTIPLICATION_DIVISION = 2,
        EXPONENT = 3,
        PARENTHESIS_FUNCTION = 4
    };

    return {
        // Numbers
        z: function(){
            return {
                toLatex: function(priority = 0) { return "z"; },
                evaluate: function(z) { return z; }
            };
        }(),
        i: function(){
            return {
                toLatex: function(priority = 0) { return "i"; },
                evaluate: function(z) {
                    return new Complexe(0,1);
                }
            };
        }(),
        complexe: function(x, y){
            return {
                toLatex: function(priority = 0) {
                    var str = "";
                    if(x != 0)
                        str += x;
                    if(x != 0 && y != 0)
                        str += (y > 0) ? "+" : "-";
                    str += y != 0 ? (Math.abs(y) != 1 ? Math.abs(y) : "")+"i" : "";
                    return str;
                },
                evaluate: function(z) {
                    return new Complexe(x,y);
                }
            };
        },

        // Operations
        plus: function(left, right) {
            return {
                toLatex: function(priority = 0) { return left.toLatex(PriorityEnum.ADDITION_SUBSTRACTION)+"+"+right.toLatex(PriorityEnum.ADDITION_SUBSTRACTION); },
                // Opérateur +
                evaluate: function(z) {
                    var zLeft = left.evaluate(z);
                    var zRight = right.evaluate(z);
                    return new Complexe(zLeft.x + zRight.x, zLeft.y + zRight.y);
                }
            };
        },
        minus: function(left, right){
            return {
                toLatex: function(priority = 0) { return left.toLatex(PriorityEnum.ADDITION_SUBSTRACTION)+"-"+right.toLatex(PriorityEnum.ADDITION_SUBSTRACTION); },
                // Opérateur -
                evaluate: function(z) {
                    var zLeft = left.evaluate(z);
                    var zRight = right.evaluate(z);
                    return new Complexe(zLeft.x - zRight.x, zLeft.y - zRight.y);
                }
            };
        },
        times: function(left, right){
            return {
                toLatex: function(priority = 0) { return left.toLatex(PriorityEnum.MULTIPLICATION_DIVISION)+"  "+right.toLatex(PriorityEnum.MULTIPLICATION_DIVISION); },
                // Opérateur *
                evaluate: function(z) {
                    var zLeft = left.evaluate(z);
                    var zRight = right.evaluate(z);
                    return new Complexe(
                        zLeft.x*zRight.x - zLeft.y*zRight.y,
                        zLeft.x*zRight.y + zLeft.y*zRight.x
                    );
                }
            };
        },
        frac: function(numerator, denominator){
            return {
                toLatex: function(priority = 0) { return "\\frac{"+numerator.toLatex(PriorityEnum.NONE)+"}{"+denominator.toLatex(PriorityEnum.NONE)+"}"; },
                // Opérateur a / b
                evaluate: function(z) {
                    var num = numerator.evaluate(z);
                    var den = denominator.evaluate(z);
                    var c = 1/(den.x*den.x + den.y * den.y);
                    return new Complexe(
                        c*(num.x*den.x + num.y*den.y),
                        c*(num.y*den.x-num.x*den.y)
                    );
                }
            };
        },
        pow: function(number, exponent){
            return {
                toLatex: function(priority = 0) { return number.toLatex(PriorityEnum.NONE)+"^{"+exponent.toLatex(PriorityEnum.NONE)+"}"; },
                // Opérateur a^b
                evaluate: function(z) {
                    var num = number.evaluate(z);
                    var exp = exponent.evaluate(z);

                    // Par convention 0^0 = 1
                    if(num.x == 0 && num.y == 0 && exp.x == 0 && exp.y == 0)
                        return new Complexe(1,0);

                    if(num.x == 0 && num.y == 0)
                        return new Complexe(0,0);

                    var r = num.module(), teta = num.argument(),
                        R = exp.module(), alpha = exp.argument();

                    var cos_alpha = Math.cos(alpha),
                        sin_alpha = Math.sin(alpha),
                        ln_r = Math.log(r);

                    var mod = Math.exp(R*(cos_alpha*ln_r - teta*sin_alpha));
                    var arg = R*(cos_alpha*teta+sin_alpha*ln_r);

                    return new Complexe(
                        mod*Math.cos(arg),
                        mod*Math.sin(arg)
                    );
                }
            };
        },

        // Functions
        re: function(expr){
            return {
                toLatex: function(priority = 0) { return "\\Re\\left({"+expr.toLatex()+"}\\right)" },
                // Fonction Re(z) : partie réel
                evaluate: function(z){
                    var zExpr = expr.evaluate(z);
                    return new Complexe(zExpr.x, 0);
                }
            };
        },
        im: function(expr){
            return {
                toLatex: function(priority = 0) { return "\\Im\\left({"+expr.toLatex()+"}\\right)" },
                // Fonction Im(z) : partie imaginaire
                evaluate: function(z){
                    var zExpr = expr.evaluate(z);
                    return new Complexe(zExpr.y,0);
                        // La fonction Im retourne bien un
                        // nombre réel qui correspond à la
                        // partie imaginaire de z
                }
            };
        },
        module: function(expr){
            return {
                toLatex: function(priority = 0) { return "\\left|"+expr.toLatex()+"\\right|" },
                // Fonction |z| : module de z
                evaluate: function(z){
                    var zExpr = expr.evaluate(z);
                    return new Complexe(zExpr.module(), 0);
                }
            };
        },
        argument: function(expr){
            return {
                toLatex: function(priority = 0) { return "\\text{arg}\\left({"+expr.toLatex()+"}\\right)" },
                // Fonction arg(z) : argument de z
                evaluate: function(z){
                    var zExpr = expr.evaluate(z);
                    return new Complexe(zExpr.argument(), 0);
                }
            };
        },
        conjuge: function(expr){
            return {
                toLatex: function(priority = 0) { return "\\overline{"+expr.toLatex()+"}" },
                // Fonction z = x+iy -> x - iy : complexe conugué
                evaluate: function(z){
                    var zExpr = expr.evaluate(z);
                    return new Complexe(zExpr.x, - zExpr.y);
                }
            };
        },
        ln: function(expr){
            return {
                toLatex: function(priority = 0) { return "\\ln\\left({"+expr.toLatex()+"}\\right)" },
                // Fonction ln(z) : logarithme neperien
                evaluate: function(z){
                    var zExpr = expr.evaluate(z);
                    return new Complexe(
                        Math.log(zExpr.module()),
                        zExpr.argument()
                    );
                }
            };
        }
    }

}();
