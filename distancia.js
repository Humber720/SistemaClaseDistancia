/* ======================================
   CONFIGURACIÓN JITSI (8x8 / JAAS)
====================================== */

/*const APP_ID = "vpaas-magic-cookie-3734582b14db4076a2f4ae0215aeb8db";
/*const DOMINIO = "8x8.vc"; CODIGO DE PAGO*/
const DOMINIO = "meet.jit.si";

/* ======================================
   ESTADO GLOBAL
====================================== */

let apiJitsi = null;

/* ======================================
   ELEMENTOS
====================================== */

const pantallaProfesor = document.getElementById("pantallaProfesor");
const pantallaEstudiante = document.getElementById("pantallaEstudiante");

const resultadoClase = document.getElementById("resultadoClase");
const codigoClase = document.getElementById("codigoClase");
const linkClase = document.getElementById("linkClase");
const nombreClase = document.getElementById("nombreClase");

const jaasContainer = document.getElementById("jaas-container");

/* ======================================
   DETECTAR SALA EN URL
====================================== */

const parametros = new URLSearchParams(window.location.search);
const salaURL = parametros.get("sala") || null;

/* ======================================
   MOSTRAR ESTUDIANTE SI HAY SALA
====================================== */

if (salaURL) {
    pantallaProfesor.classList.add("oculto");
    pantallaEstudiante.classList.remove("oculto");
    nombreClase.textContent = salaURL;
}

/* ======================================
   GENERAR CLASE
====================================== */

const btnGenerar = document.getElementById("btnGenerar");

if (btnGenerar) {

    btnGenerar.addEventListener("click", () => {

        const materia = document.getElementById("materia").value.trim().toUpperCase();
        const curso = document.getElementById("curso").value.trim().toUpperCase();

        if (!materia || !curso) {
            alert("Ingrese la materia y el curso.");
            return;
        }

        /* 🔥 SALA MÁS SEGURA Y ÚNICA */
        const idUnico = Math.random().toString(36).substring(2, 7).toUpperCase();
        const sala = `${materia}-${curso}-${idUnico}`;

        const enlace = `${window.location.origin}${window.location.pathname}?sala=${encodeURIComponent(sala)}`;

        /* QR */
        const qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {
            text: enlace,
            width: 220,
            height: 220
        });

        resultadoClase.classList.remove("oculto");
        codigoClase.textContent = sala;
        linkClase.value = enlace;
    });
}

/* ======================================
   COPIAR ENLACE
====================================== */

const btnCopiar = document.getElementById("btnCopiar");

if (btnCopiar) {

    btnCopiar.addEventListener("click", async () => {

        try {
            await navigator.clipboard.writeText(linkClase.value);
            alert("Enlace copiado correctamente.");
        } catch {
            linkClase.select();
            document.execCommand("copy");
            alert("Enlace copiado.");
        }

    });
}

/* ======================================
   ENTRAR A CLASE (ESTUDIANTE)
====================================== */

const btnEntrar = document.getElementById("btnEntrarClase");

if (btnEntrar) {

    btnEntrar.addEventListener("click", () => {

        const nombre = document.getElementById("nombreEstudiante").value.trim();

        if (!nombre) {
            alert("Escriba su nombre.");
            return;
        }

        if (!salaURL) {
            alert("No hay una clase activa.");
            return;
        }

        iniciarClase(salaURL, nombre);
    });
}

/* ======================================
   INICIAR VIDEOLLAMADA (JITSI / 8x8)
====================================== */

function iniciarClase(sala, nombre) {

    /* cerrar sesión anterior si existe */
    if (apiJitsi) {
        apiJitsi.dispose();
        apiJitsi = null;
    }

    pantallaEstudiante.style.display = "none";
    pantallaProfesor.style.display = "none";
    jaasContainer.style.display = "block";

    /*const roomName = `${APP_ID}/${encodeURIComponent(sala)}`;

    apiJitsi = new JitsiMeetExternalAPI(DOMINIO, {
        roomName,*/
    
    const roomName = sala;

    apiJitsi = new JitsiMeetExternalAPI(DOMINIO, {
        roomName,

        parentNode: jaasContainer,

        userInfo: {
            displayName: nombre
        },

        configOverwrite: {
            defaultLanguage: "es",
            prejoinPageEnabled: false,
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            resolution: 360,
            disableDeepLinking: true
        },

        interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false
        }
    });
}

/* ======================================
   ENTRAR PROFESOR A CLASE
====================================== */

const btnEntrarProfesor = document.getElementById("btnEntrarProfesor");

if (btnEntrarProfesor) {

    btnEntrarProfesor.addEventListener("click", () => {

        const enlace = document.getElementById("linkClase").value;

        if (!enlace) {
            alert("Primero genere una clase.");
            return;
        }

        window.open(enlace, "_blank");
    });
}

/* ======================================
   LOG
====================================== */

console.log("Aula Virtual cargada correctamente 🚀");
