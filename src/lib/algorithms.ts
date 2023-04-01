const sortByServiceTime = (processorList: Processor[]) => {
    let sorted = processorList.slice(0);
    sorted.sort(function(a,b) {
        return a.serviceTime - b.serviceTime;
    });
    return sorted;
}

const sortByTimeLeft = (processorList: Processor[]) => {
    let sorted = processorList.slice(0);
    sorted.sort(function(a,b) {
        return (a.serviceTime - a.timeRan) - (b.serviceTime - b.timeRan);
    });
    return sorted;
}

export const hrrn = (processorList: Processor[]) => {
   return "hi";     
}

export const srtf = (processorList: Processor[]) => {
    let time = 0;
    let readyList: Processor[] = [];
    let doneList: PostProcessor[] = [];
    while (readyList.length || processorList.length) {
        while (processorList.length && processorList[0].arrivalTime === time) {
            readyList.push(processorList[0]);
            processorList.shift();
            readyList = sortByTimeLeft(readyList);
        }

        while (readyList.length && readyList[0].timeRan === readyList[0].serviceTime) {
            let obj = readyList[0];
            doneList.push({id: obj.id, arrivalTime: obj.arrivalTime, completionTime: time, tatTime: time - obj.arrivalTime, waitingTime: time - obj.arrivalTime - obj.serviceTime});
            readyList.shift();
            readyList = sortByTimeLeft(readyList);
        }

        if (readyList.length) {
            readyList[0].timeRan++;
        }

        time++;
    }


    return doneList;

    // need to sort by time left which is service time - tam ran
 }

 export const sjf = (processorList: Processor[]) => {
    let time = 0;
    let readyList: Processor[] = [];
    let doneList: PostProcessor[] = [];
    while (readyList.length || processorList.length) {
        while (processorList.length && processorList[0].arrivalTime === time) {
            readyList.push(processorList[0]);
            processorList.shift();
        }

        while (readyList.length && readyList[0].timeRan === readyList[0].serviceTime) {
            let obj = readyList[0];
            doneList.push({id: obj.id, arrivalTime: obj.arrivalTime, completionTime: time, tatTime: time - obj.arrivalTime, waitingTime: time - obj.arrivalTime - obj.serviceTime});
            readyList.shift();
            readyList = sortByServiceTime(readyList);
        }

        if (readyList.length) {
            readyList[0].timeRan++;
        }

        time++;
    }


    return doneList;


    // sort by arrival
    // have time variable that increments
    // while next thing in sorted list is same as time, add to ready list, remove from sorted list
    // current time variable that keeps track of how long current process has been looping
    // create a done list and add stuff to it when serviceTime === timeRan
    // if readylist and sortedlist both empty, return done

    // id: number;
	// arrivalTime: number;
	// completionTime: number;
	// tatTime: number;
	// waitingTime: number;
 }

 export const priority = (processorList: Processor[]) => {
    return "hi"; 
 }
 