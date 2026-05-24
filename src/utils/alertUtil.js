import Swal from "sweetalert2";

export const notificacionToast = (texto, tipo = "success") => {


  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  })
  
  Toast.fire({
    icon: tipo,
    title: texto,
  });
};



export const notificacionError = errors =>{

    const { status , data } = errors;

    if(status == 422 ){

        let mensajes = ''

        const errores = data.errors;

        if(typeof errores == 'object'){

            mensajes = Object.values(errores).flat().map(mensaje => `<p class="text-danger mb-0">${mensaje}</p>`).join('');
        }else {
            mensajes = `<p class="text-danger mb-0">${errores}</p>`
        }

        Swal.fire({
            title: 'Error de Validación',
            html: mensajes,
            icon: 'error',
        })



    }


    if(status == 404){
        Swal.fire('Error!', 'El recurso solicitado no fue encontrado, o no está disponible.', 'error');
    }

    if(status == 403){
        Swal.fire('Error!', 'No tienes permiso para realizar esta acción.', 'error');
    }

    if(status == 401){
        Swal.fire('Error!', 'No estás autenticado, por favor inicia sesión para continuar.', 'error');
    }

    if(status == 500){
        Swal.fire('Error!', 'Ocurrió un error en el servidor, por favor intente nuevamente más tarde.', 'error');
    }

}
