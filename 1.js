
var canvas, ctx, tx, ty, cvs, cxs, cmax;
(function () {
    var a, b, oya;
    a = Object.getOwnPropertyNames(Math);

    for (b = 0; b < a.length; b++)window[a[b]] = Math[a[b]];

    oya = cretag("span");
    cvs = [];
    cxs = [];
    tx = 250;
    ty = 125;
    cmax = 10;
    for (a = 0; a < cmax; a++) {
        cvs[a] = cretag("canvas", oya, { width: 500, height: 250 });
        cxs[a] = cvs[a].getContext('2d');
    }
    aaa();
})();

function cretag(tp, tg, p) {
    var a, b;
    if (!tg) tg = document.body;
    if (!tp) tp = "input";
    a = document.createElement(tp);
    if (p) for (b in p) a[b] = p[b];
    tg.appendChild(a);
    return a;
}

function aaa() {
    var a, b, c, d, e, f, g, n, s, t, u, v, tim, max, pt, wid, px, x;
    tim = new Date().getTime() / 100;
    max = 18;
    n = tim / 1000;
    t = ran();
    n = tim / 2000;
    a = tim / 4 + sin(ran()) * 100;
    v = a % 1;
    u = a | 0;

    for (g = 0; g < cmax; g++) {
        canvas = cvs[g];
        ctx = cxs[g];
        canvas.width = canvas.width;
        ctx.globalCompositeOperation = "source-over";
        a = 1;
        if (!g) a = v;
        if (g == cmax - 1) a = 1 - v;
        b = (1 - (g + v) / cmax) * 90;

        ctx.fillStyle = "hsla(222,60%," + b + "%," + a + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "destination-out";
        s = pow(32, (g + v) / (cmax - 1) * 0.2);
        ctx.fillStyle = "#000";

        s *= 1.6;
        pt = [];
        n = (g - u) * 1111;
        for (a = 0; a < max; a++) {
            b = 1 + ran() / 2;
            c = (ran() - 0.5) / 2;
            d = 0.4 + ran() / 6 + sin((g - u) / 20) * 0.1;
            e = (ran() - 0.5) / 5;
            f = (ran() - 0.5) / 3;
            pt.push([b, c, a + f, d, e]);
        }

        for (a = 0; a < max - 1; a++) {
            b = pt[a];
            c = pt[a + 1];
            d = c[2] - b[2];
            e = d - b[0] * b[3] - c[0] * c[3];
            if (e > 0.1) {
                f = 1;
                if (ran() < 0.2) f = -1;
                pt.push([0.3 + ran() / 6 + f * 0.1, (ran() - 0.5) / 6, b[2] + d / 2, 0.3 + ran() / 5, -0.6 * f]);
            }
        }

        wid = 500 * s;
        px = ran() / 2;
        for (a = 0; a < pt.length; a++) {
            c = pt[a];
            b = (c[2] / (max) + t - px) * wid + tx;
            dae(b, ty + c[4] * s * 20, 20 * s * c[0], c[3], c[1]);
            x = b;
            for (d = 0; d < 2; d++) {
                x += wid;
                if (x < -300) break;
                dae(x, ty + c[4] * s * 20, 20 * s * c[0], c[3], c[1]);
            }
            x = b;
            for (d = 0; d < 2; d++) {
                x += wid;
                if (x > 800) break;
                dae(x, ty + c[4] * s * 20, 20 * s * c[0], c[3], c[1]);
            }
        }
        if (!g) {
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "hsl(222,60%," + (100) + "%)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

    }

    function ran() {
        var a;
        n++;
        a = sin(n * 3) + sin(n * 7) + sin(n * 19) + sin(n * 43);
        a = a / 8 + 0.5;
        if (a < 0.2) n++;
        return a;
    }
    requestAnimationFrame(aaa);

}

function dae(x, y, han, w, r) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(r);
    ctx.scale(w, 1);
    ctx.translate(-x, -y);
    ctx.beginPath();
    ctx.arc(x, y, han, 0, PI * 2, 0);
    ctx.fill();
    ctx.restore();
}
