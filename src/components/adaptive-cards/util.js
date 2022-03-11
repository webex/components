/**
 * Formats date and the time
 *
 * @param {string} text The text to be formatted
 * @returns {string} Returns formatted text
 */
export function formatDateTime(text) {
  const isoDate = '(\\d{4}-\\d{2}-\\d{2}T?\\d{2}:\\d{2}:\\d{2}Z?(?:[-+]\\d{2}:\\d{2})?)';
  const dateRegex = new RegExp(`{{DATE\\(${isoDate},?\\s*(SHORT|LONG|COMPACT)?\\)}}`, 'g');
  const timeRegex = new RegExp(`{{TIME\\(${isoDate}\\)}}`, 'g');

  const dateFormatOptions = {
    COMPACT: {dateStyle: 'short'},
    SHORT: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    },
    LONG: {dateStyle: 'full'},
  };

  const formatDate = (_, date, format) => {
    const options = dateFormatOptions[format] || dateFormatOptions.COMPACT;

    return new Date(date).toLocaleDateString([], options);
  };

  const formatTime = (_, date) => new Date(date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  return text && text.replace(dateRegex, formatDate).replace(timeRegex, formatTime);
}

export default {formatDateTime};
