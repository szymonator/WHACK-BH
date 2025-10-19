export {
    requestAnalysis
}

const domain = 'http://127.0.0.1:5000/';

async function requestAnalysis(link) {
try {
    const response = await fetch(domain + "analysis", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ URL: link }),
        credentials: 'include'
    })

    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()

}

catch (error) {
    console.error(error.message)
}

}
