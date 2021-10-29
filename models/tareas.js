const colors = require('colors');
const Tarea = require('./tarea');

class Tareas {
	_listado = {};

	get listadoArray() {
		const listado = [];
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	constructor() {
		this._listado = {};
	}

	borrarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}
	crearTarea(desc = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	listadoCompleto() {
		console.log();
		this.listadoArray.forEach(({ desc, completadoEn }, i) => {
			const itemIndex = `${i + 1}.`.green;
			const itemCompleted = completadoEn ? 'Completada'.green : 'Pendiente'.red;
			const item = `${itemIndex} ${desc} :: ${itemCompleted}`;
			console.log(item);
		});
	}

	listarPendientesCompletadas(completadas = true) {
		let contador = 0;

		this.listadoArray.forEach(({ desc, completadoEn }) => {
			const itemCompleted = completadoEn ? 'Completada'.green : 'Pendiente'.red;

			if (completadas) {
				if (completadoEn) {
					contador += 1;
					const item = `${(contador + '.').green} ${desc} :: ${
						completadoEn.green
					}`;
					console.log(item);
				}
			} else {
				if (completadoEn) return;
				contador += 1;
				const item = `${(contador + '.').green} ${desc} :: ${itemCompleted}`;
				console.log(item);
			}
		});
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			const tarea = this._listado[id];
			if (!tarea.completadoEn) {
				tarea.completadoEn = new Date().toISOString();
			}
		});
		this.listadoArray.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;
