<script lang="ts">

    const addProcessor = () => {
        processorList = [...processorList, {id: processorList.length, arrivalTime: 0, serviceTime: 1, priority: 1}];
    }

    const removeProcessor = () => {
        if (processorList.length > 1) {
            processorList.pop();
            processorList = [...processorList];
        }
    }

    let processorList: Processor[] = [{id: 0, arrivalTime: 0, serviceTime: 1, priority: 1}];

</script>

<main class="h-screen w-full bg-slate-900 flex flex-col items-center py-10 px-5 overflow-y-auto">
    <p class="text-white text-3xl font-bold mb-10 text-center">OS Scheduling Algorithms Visualizer</p>
    <div class="flex items-center gap-10 mb-7 text-white font-bold">
        <button class="bg-sky-500 px-5 py-3 rounded-xl" on:click={addProcessor}>ADD</button>
        <button class="bg-red-500 px-5 py-3 rounded-xl" on:click={removeProcessor}>REMOVE</button>
        <button type="submit" form="processor-form" class="bg-green-500 px-5 py-3 rounded-xl">RUN</button>
    </div>
    <div class="w-full max-w-[1000px]">
        <p class="text-white font-bold text-2xl mb-3 self-start">LIST OF PROCESSORS</p>
        <form id="processor-form">
            <table class="border border-collapse w-full">
                <tr>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Processor</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Arrival Time</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Service Time</th>
                <th class="bg-slate-800 p-3 border-solid border border-gray-500 text-white text-left">Priority</th>
                </tr>
                {#each processorList as processor}
                    <tr>
                        <td class="p-2 text-left bg-slate-700 text-gray-200 border border-gray-500 border-solid">P{processor.id}</td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="0" max="999" required value={processor.arrivalTime}/>
                        </td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="1" max="999" required value={processor.serviceTime}/>
                        </td>
                        <td class="text-left h-[41px] p-0 bg-slate-700 text-gray-200 border border-gray-500 border-solid">
                            <input class="w-full h-full px-2 bg-transparent border-none focus:outline-none hover:bg-slate-600 focus:bg-slate-500" type="number" min="1" max="999" required value={processor.priority}/>
                        </td>
                    </tr>     
                {/each}
            </table>
        </form>
        <!-- <div class="container h-[200px] bg-slate-700 rounded-xl shadow p-8">
            {#each processorList as processor}
                <div class="flex items-center text-white bg-slate-500 rounded-xl h-[50px]">
                    p{processor.id}
                </div>
            {/each}
    
        </div> -->
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