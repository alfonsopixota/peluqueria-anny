const SERVICES = [
    { id: 1, name: "Corte & Estilo", price: 25, duration: "45 min" },
    { id: 2, name: "Coloración Premium", price: 45, duration: "90 min" },
    { id: 3, name: "Tratamientos SPA", price: 30, duration: "60 min" },
    { id: 4, name: "Peinados Especiales", price: 35, duration: "60 min" }
];

const getServicePrice = (serviceName) => {
    const service = SERVICES.find(s => s.name === serviceName);
    return service ? service.price : null;
};

module.exports = { SERVICES, getServicePrice };
