// Converts each word in the input sentence to uppercase
const ConvertFirstWordUpper = (sentence) => {
    const words = sentence.split(" ");
    words[0] = words[0][0].toUpperCase() + words[0].substr(1);
    return words.join(" ");
}

export default ConvertFirstWordUpper;