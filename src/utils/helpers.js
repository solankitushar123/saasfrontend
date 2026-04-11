export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + '...' : str

export const slugify = (str) => str?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase()
