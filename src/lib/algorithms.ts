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

const sortByPriority = (processorList: Processor[]) => {
    let sorted = processorList.slice(0);
    sorted.sort(function(a,b) {
        return a.priority - b.priority;
    });
    return sorted;
}

const sortByHrrn = (processorList: Processor[], time: number) => {
    let sorted = processorList.slice(0);
    sorted.sort(function(a,b) {
        return ((time - b.arrivalTime + b.serviceTime)/b.serviceTime) - ((time - a.arrivalTime + a.serviceTime)/a.serviceTime) ;
    });
    return sorted;
}

export const hrrn = (processorList: Processor[]) => {
    let time = 0;
    let readyList: Processor[] = [];
    let doneList: PostProcessor[] = [];
    let processorRunning: boolean = false;
    while (readyList.length || processorList.length) {
        while (processorList.length && processorList[0].arrivalTime === time) {
            readyList.push(processorList[0]);
            processorList.shift();
        }

        if (!processorRunning) {
            readyList = sortByHrrn(readyList, time);
        }

        while (readyList.length && readyList[0].timeRan === readyList[0].serviceTime) {
            let obj = readyList[0];
            doneList.push({id: obj.id, arrivalTime: obj.arrivalTime, completionTime: time, tatTime: time - obj.arrivalTime, waitingTime: time - obj.arrivalTime - obj.serviceTime});
            readyList.shift();
            readyList = sortByHrrn(readyList, time);
        }

        if (readyList.length) {
            readyList[0].timeRan++;
            if (!processorRunning) {
                processorRunning = true;
            }
        }
        else {
            processorRunning = false;
        }

        time++;
    }


    return doneList;
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
 }

 export const sjf = (processorList: Processor[]) => {
    let time = 0;
    let readyList: Processor[] = [];
    let doneList: PostProcessor[] = [];
    let processorRunning: boolean = false;
    while (readyList.length || processorList.length) {
        while (processorList.length && processorList[0].arrivalTime === time) {
            readyList.push(processorList[0]);
            processorList.shift();
        }

        if (!processorRunning) {
            readyList = sortByServiceTime(readyList);
        }

        while (readyList.length && readyList[0].timeRan === readyList[0].serviceTime) {
            let obj = readyList[0];
            doneList.push({id: obj.id, arrivalTime: obj.arrivalTime, completionTime: time, tatTime: time - obj.arrivalTime, waitingTime: time - obj.arrivalTime - obj.serviceTime});
            readyList.shift();
            readyList = sortByServiceTime(readyList);
        }

        if (readyList.length) {
            readyList[0].timeRan++;
            if (!processorRunning) {
                processorRunning = true;
            }
        }
        else {
            processorRunning = false;
        }

        time++;
    }


    return doneList;
 }

 export const priority = (processorList: Processor[]) => {
    let time = 0;
    let readyList: Processor[] = [];
    let doneList: PostProcessor[] = [];
    while (readyList.length || processorList.length) {
        while (processorList.length && processorList[0].arrivalTime === time) {
            readyList.push(processorList[0]);
            processorList.shift();
            readyList = sortByPriority(readyList);
        }

        while (readyList.length && readyList[0].timeRan === readyList[0].serviceTime) {
            let obj = readyList[0];
            doneList.push({id: obj.id, arrivalTime: obj.arrivalTime, completionTime: time, tatTime: time - obj.arrivalTime, waitingTime: time - obj.arrivalTime - obj.serviceTime});
            readyList.shift();
            readyList = sortByPriority(readyList);
        }

        if (readyList.length) {
            readyList[0].timeRan++;
        }

        time++;
    }


    return doneList;
 }
 