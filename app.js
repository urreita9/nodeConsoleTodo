require('colors');
const {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarEstadoChecklist,
} = require('./helpers/inquirer');
const { guardarDb, leerDb } = require('./helpers/guardarDb');
const Tareas = require('./models/tareas');
console.clear();

const main = async () => {
	let opt = '';
	const tareas = new Tareas();
	const tareasDb = leerDb();

	if (tareasDb) {
		tareas.cargarTareasFromArray(tareasDb);
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				const desc = await leerInput('Descripcion: ');
				// console.log(desc);
				tareas.crearTarea(desc);
				break;

			case '2':
				tareas.listadoCompleto();
				break;

			case '3':
				tareas.listarPendientesCompletadas(true);
				break;

			case '4':
				tareas.listarPendientesCompletadas(false);
				break;

			case '5':
				const ids = await mostrarEstadoChecklist(tareas.listadoArray);
				tareas.toggleCompletadas(ids);
				break;
			case '6':
				//borrar
				const id = await listadoTareasBorrar(tareas.listadoArray);
				if (id !== '0') {
					const ok = await confirmar(
						'Esta seguro de que desea borrar el Item?'
					);

					if (ok) {
						tareas.borrarTarea(id);
						console.log('Tarea borrada correctamente'.green);
					}
				}

				break;
		}
		guardarDb(tareas.listadoArray);

		console.log('\n');
		await pausa();
	} while (opt !== '0');
};

main();
