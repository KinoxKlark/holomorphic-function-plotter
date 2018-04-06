
var support_domaine = getCanvas("support-domaine");
var support_image = getCanvas("support-image");

var function_to_draw = cplx.z;

console.log(support_domaine);
console.log(support_image);


/**
    Retourne un objet js qui encapsule le canvas et son contexte
*/
function getCanvas(id) {

    var obj = {
        canvas: null,
        ctx: null,
        view: {
            center: {
                x: 0,
                y: 0
            },
            scale: 2
        }
    }

    obj.canvas = document.getElementById(id);
    obj.ctx = obj.canvas.getContext("2d");

    var canvas = obj.canvas;

    canvas.addEventListener("wheel", mouseWheelAction);
    canvas.addEventListener("mousedown", mouseDownAction);

    updateCanvas(obj);

    return obj;
}

/**
    Met a jour le translate et le scale du contexte d'un canevas
*/
function updateCanvas(support) {

    var coord = complexeCoordToSupportCoord(0,0, support);

    //obj.ctx.translate(obj.canvas.width*0.5, obj.canvas.height*0.5);

    var facW = 2*support.view.scale/support.canvas.width,
        facH = 2*support.view.scale/support.canvas.height;

    support.ctx.translate(coord.x, coord.y);
    support.ctx.scale(1/facW,-1/facH);
}

function draw() {
    drawDomaine();
    drawImage();
}

function drawDomaine() {
    var support = support_domaine;

    drawColor(support, function_to_draw);
    /**
    f = function(x,y) {
        var val = { x:0, y:0 };

        val.x = (x*x-y*y)/(x-1);
        val.y = (2*x*y)/(y-2);

        return val;
    }
    **/
    drawAxes(support);
}

function drawImage() {
    var support = support_image;
    drawColor(support);
    drawAxes(support);
}

function drawAxes(support) {
    var ctx = support.ctx;

    var origine = complexeCoordToSupportCoord(0,0, support);
    var top = supportCoordToComplexeCoord(0,0, support),
        bottom = supportCoordToComplexeCoord(support.canvas.width, support.canvas.height, support);

    var line_width = 1.5*(2*support.view.scale/support.canvas.width);
    ctx.lineWidth = line_width;

    //console.log(top);

    // Axe imaginaire
    ctx.beginPath();
    ctx.moveTo(0, top.y);
    ctx.lineTo(0, bottom.y);
    {
        var current = Math.floor(bottom.y-1);
        while(current < top.y)
        {
            ctx.moveTo(-line_width*3, current);
            ctx.lineTo(line_width*3, current);
            current += 1;
        }
    }
    ctx.stroke();


    // Axe réel
    ctx.beginPath();
    ctx.moveTo(top.x, 0);
    ctx.lineTo(bottom.x, 0);
    {
        var current = Math.floor(top.x-1);
        while(current < bottom.x)
        {
            ctx.moveTo(current,-line_width*3);
            ctx.lineTo(current, line_width*3);
            current += 1;
        }
    }
    ctx.stroke();

    ctx.setLineDash([0.1]);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";

    //*
    // Tests
    ctx.beginPath();
    ctx.arc(0,0,1,0,2*Math.PI);
    ctx.stroke();
    //*/
    //*
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(1,1);
    ctx.stroke();
    //*/

    ctx.strokeStyle = "#000000";
    ctx.setLineDash([]);
}

/**
    Dessine la roue de couleur selon la fonction f:C->C passée en paramètre
*/
function drawColor(support, f = cplx.z /*function(x,y){ return {x:x,y:y}; }*/) {

    var ctx = support.ctx;
    var pixels = ctx.getImageData(0,0, support.canvas.width,support.canvas.height);

    /* Colorie un pixel d'une couleur, coordonée du supports et non dans le plan complexe */
    var colorPixel = function(x,y, r,g,b,a = 255) {
        pixels.data[4*y*pixels.width+4*x+0] = r;    // Red
        pixels.data[4*y*pixels.width+4*x+1] = g;      // Green
        pixels.data[4*y*pixels.width+4*x+2] = b;    // Blue
        pixels.data[4*y*pixels.width+4*x+3] = a;  // Alpha
    };

    for(var x=0; x < pixels.width; x++)
    {
        for(var y=0; y < pixels.height; y++)
        {
            var coord = supportCoordToComplexeCoord(x,y, support);
            coord = f.evaluate(new Complexe(coord.x, coord.y));
            var color = getColorAtNumber(coord.x, coord.y);
            colorPixel(x,y, color.r, color.g , color.b);
        }
    }

    ctx.putImageData(pixels, 0, 0);
}

/**
    Retourne la couleure HSV par rapport au point x + iy sur la roue complete
*/
function getColorAtNumber(x,y) {
    return hsvToRgb(radToDeg(complexeArg(x,y)),1,1);
}

/**
    Transforme les coordonées du canvas en coordonée sur le plan complexe
*/
function supportCoordToComplexeCoord(x,y, support) {
    var width = support.canvas.width,
        height = support.canvas.height;

    var dWidth = width/2,
        dHeight = height/2;

    var view = support.view;

    //console.log(height);

    var facW = view.scale/dWidth,
        facH = view.scale/dHeight;

    return {
        x: (x + view.center.x/facW - dWidth)*facW,
        y: -(y - view.center.y/facH - dHeight)*facH
    };
}

function complexeCoordToSupportCoord(x,y, support) {
    var width = support.canvas.width,
        height = support.canvas.height;

    var dWidth = width/2,
        dHeight = height/2;

    var view = support.view;

    //console.log(height);

    var facW = view.scale/dWidth,
        facH = view.scale/dHeight;

    return {
        x: (x/facW)-view.center.x/facW + dWidth,
        y: (-y/facH) + view.center.y/facH + dHeight
    };
}

/**
    Retourne le module du complexe x + iy
*/
function complexeMod(x,y){
    return Math.sqrt(x*x+y*y);
}

/**
    Retourne l'argument du complexe x + iy
*/
function complexeArg(x,y){
    if(y == 0 && x <= 0)
        return Math.PI;
    return 2*Math.atan(y/(x+complexeMod(x,y)));
}

/**
    Convert radian to degree angles
*/
function radToDeg(rad) {
    return 360*rad/(2*Math.PI);
}
function degToReg(rad) {
    return 2*Math.PI*rad/360;
}

/**
    Convert HSV color to RGB color
*/
function hsvToRgb(h,s,v) {

    h = (h%360+360)%360;

    var r,g,b;

    var c = v*s;
    var x = c*(1 - Math.abs(((h/60) % 2)-1));
    var m = v-c;

    if(0 <= h && h < 60){
        r = c;
        g = x;
        b = 0;
    }
    else if(h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if(h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if(h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if(h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: 255*(r+m),
        g: 255*(g+m),
        b: 255*(b+m)
    }
}

function mouseWheelAction(ev) {
    ev.preventDefault();
    var delta = ev.wheelDelta/Math.abs(ev.wheelDelta);

    var val = delta == 0 ? 0 : (delta > 0 ? 1/2  : 2);

    support_domaine.view.scale *= val;
    support_domaine.view.scale = Math.max(0,support_domaine.view.scale);
    updateCanvas(support_domaine);

    support_image.view.scale *= val;
    support_image.view.scale = Math.max(0,support_image.view.scale);
    updateCanvas(support_image);

    draw();
}

function mouseDownAction(ev) {
    ev.preventDefault();
    var inside = true;

    var mouseMoveListener = function(ev){
        var dx = ev.movementX,
            dy = ev.movementY;

        var view = support_domaine.view;
        var facW = view.scale/(0.5*support_domaine.canvas.width),
            facH = view.scale/(0.5*support_domaine.canvas.height);

        dx = (dx)*facW;
        dy = -(dy)*facH;

        support_domaine.view.center.x += -dx;
        support_domaine.view.center.y += -dy;

        support_image.view.center.x += -dx;
        support_image.view.center.y += -dy;

        updateCanvas(support_domaine);
        updateCanvas(support_image);
        draw();
    };

    var mouseUpListener = function(ev) {
        document.removeEventListener("mousemove", mouseMoveListener);
    };

    document.addEventListener("mousemove", mouseMoveListener);
    document.addEventListener("mouseup", mouseUpListener);
}
