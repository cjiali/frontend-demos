export default function(arr){
    let l=arr.length;
    for(let i=0; i<l-1; i++){
        for(let j=i; j<l; j++){
            if(arr[i]>arr[j]){
                [arr[i], arr[j]]=[arr[j], arr[i]]
            }
        }
    }
    return arr;
}