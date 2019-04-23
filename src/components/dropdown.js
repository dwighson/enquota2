export function dropdown(obj, selected) {
	this.values = obj
	let vall = this.values
	this.SelectedVal = this.values.filter(function(val) {
		return val == selected
	})
}
