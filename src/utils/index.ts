function formatCurrency(value: number) {
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixIndex = 0;
  
    while (value >= 1000) {
      value /= 1000;
      suffixIndex++;
    }
  
    const roundedValue = Math.round(value * 100) / 100;
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(roundedValue);
  
    return `${formattedValue} ${suffixes[suffixIndex]}`;
}

export {formatCurrency};