function check () {
	return !!localStorage.getItem('userid')
}

export default {
	check: check
}