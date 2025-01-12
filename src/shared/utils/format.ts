// time format
export function formatTimeTo12Hour(date: string): string {

  const dateObj = new Date(date)
  let hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const formattedTime = `${hours} : ${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
  return formattedTime
}

export const getDateFromDateObject = (dateObj: Date) => dateObj.toISOString().split('T')[0]

export const get12HourTimeFromDateObject = (dateObj: Date): string => {
  let hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()

  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const formattedTime = `${hours} : ${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
  return formattedTime
}

// convert keys of an object to snake cased keys
export function toSnakeCase(obj: Record<string, any>): Record<string, any> {
  const snakeCaseKey = (key: string) =>
    key.replace(/([A-Z])/g, '_$1').toLowerCase()

  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeCase(item))
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[snakeCaseKey(key)] = toSnakeCase(obj[key])
      return acc
    }, {} as Record<string, any>)
  }

  return obj
}

export function toCamelCase(obj: Record<string, any> | Record<string, any>[]): Record<string, any> | Record<string, any>[] {
  const convertKey = (key: string): string => {
    return key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  } else if (obj !== null && obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
      const camelKey = convertKey(key);
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
