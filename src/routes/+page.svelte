<script lang="ts">
    import { hrrn, srtf, sjf, priority } from "../lib/algorithms";
    
    const addProcessor = () => {
        processorList = [...processorList, {id: processorList.length, arrivalTime: 0, serviceTime: 1, priority: 1, timeRan: 0}];
        console.log(processorList)
    }

    const removeProcessor = () => {
        if (processorList.length > 1) {
            processorList.pop();
            processorList = [...processorList];
        }
    }

    const runAlgorithm = () => {
        let sorted = processorList.slice(0);
        sorted.sort(function(a,b) {
            return a.arrivalTime - b.arrivalTime;
        });
        switch(dropdownValue) {
            case "hrrn":
                hrrn(sorted);
                break;
            case "srtf":
                doneList = srtf(sorted);
                break;
            case "sjf":
                doneList = sjf(sorted);
                break;
            case "priority":
                priority(sorted);
                break;
        }
        done = true;
    }

    let processorList: Processor[] = [{id: 0, arrivalTime: 0, serviceTime: 1, priority: 1, timeRan: 0}];
    let dropdownValue: string = "hrrn";
    let doneList: PostProcessor[] = [];
    let done: boolean = false;

</script>

<main class="h-screen w-full bg-slate-900 flex flex-col items-center py-10 px-5 overflow-y-auto">
    <p class="text-white text-3xl font-bold mb-10 text-center">OS Scheduling Algorithms Visualizer</p>
    <div class="flex items-center gap-10 mb-5 text-white font-bold">
        <button class="bg-sky-500 px-5 py-3 rounded-xl" on:click={addProcessor}>ADD</button>
        <button class="bg-red-500 px-5 py-3 rounded-xl" on:click={removeProcessor}>REMOVE</button>
        <button type="submit" form="processor-form" class="bg-green-500 px-5 py-3 rounded-xl" on:click={runAlgorithm}>RUN</button>
    </div>
    <select class="focus:outline-none p-3 rounded-xl bg-slate-500 text-white mb-5" bind:value={dropdownValue}>
        <option value="hrrn">Highest Response Ratio Next</option>
        <option value="srtf">Shortest Remaining Time First (preemptive)</option>
        <option value="sjf">Shortest Job First (non-preemptive)</option>
        <option value="priority">Priority (preemptive)</option>
    </select>
    <div class="w-full max-w-[1000px] mb-10">
        <p class="text-white font-bold text-2xl mb-3 self-start">LIST OF PROCESSORS</p>
        <form id="processor-form">
            <table class="border border-collapse w-full">
                <tr>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Processor</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Arrival Time</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Service Time</th>
                {#if dropdownValue == "priority"}
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Priority</th>
                {/if}
                </tr>
                {#each processorList as processor}
                    <tr>
                        <td class="p-2 text-left bg-slate-700 text-gray-200 border border-gray-500 border-solid">P{processor.id}</td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="0" max="999" required bind:value={processorList[processor.id].arrivalTime}/>
                        </td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="1" max="999" required bind:value={processorList[processor.id].serviceTime}/>
                        </td>
                        {#if dropdownValue == "priority"}
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="1" max="999" required bind:value={processorList[processor.id].priority}/>
                        </td>
                        {/if}
                    </tr>     
                {/each}
            </table>
        </form>
    </div>

    <div class="w-full max-w-[1000px]">
        <p class="text-white font-bold text-2xl mb-3 self-start">OUTPUT LIST</p>
        <form id="processor-form">
            <table class="border border-collapse w-full">
                <tr>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Processor</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Arrival Time</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Completion Time</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Turnaround Time</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Waiting Time</th>
                </tr>
                {#each doneList as processor, i}
                    <tr>
                        <td class="p-2 text-left bg-slate-700 text-gray-200 border border-gray-500 border-solid">P{processor.id}</td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="0" max="999" required bind:value={doneList[i].arrivalTime}/>
                        </td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="1" max="999" required bind:value={doneList[i].completionTime}/>
                        </td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="1" max="999" required bind:value={doneList[i].tatTime}/>
                        </td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="1" max="999" required bind:value={doneList[i].waitingTime}/>
                        </td>
                    </tr>     
                {/each}
            </table>
        </form>
    </div>
</main>

<style>
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    ::-webkit-scrollbar {
        width: 5px;
        background: transparent;
        height: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 10px;
    }
</style>