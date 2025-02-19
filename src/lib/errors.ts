/**
 * Check that the argument is of type Error before returning the message
 * @param error 
 * @returns 
 */
export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message
	return String(error)
}