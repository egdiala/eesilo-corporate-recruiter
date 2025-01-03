export function capitalizeWords(str: string) {
  return str?.split(" ")?.map(word => word.charAt(0).toUpperCase() + word.slice(1))?.join(" "); // Join the words back into a single string
}