import html2pdf from 'html2pdf.js';

const ReportsPage = () => {
  const data = [
    { fecha: '17/04/2025 10:00', temperatura: '34.5 °C', humedad: '40%', uv: '5', sensor: 'ESP-01' },
    { fecha: '17/04/2025 15:25', temperatura: '40 °C', humedad: '32%', uv: '4', sensor: 'ESP-01' },
    { fecha: '17/04/2025 20:36', temperatura: '26.8 °C', humedad: '25%', uv: '6', sensor: 'ESP-01' },
    { fecha: '20/04/2026 22:17', temperatura: '100 °C', humedad: '25%', uv: '6', sensor: 'ESP-01' },
  ];

  const handleDownloadPDF = () => {
    const element = document.getElementById('table-pdf');
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: 'reporte_deshidratador.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#173555] pt-8 pb-6">Reportes</h2>

      <div className="bg-white p-6 rounded-xl">
        <div
          id="table-pdf"
          className="rounded-xl overflow-hidden border border-[#173555]"
        >
          <table className="min-w-full table-auto border-collapse text-center">
            <thead className="bg-[#C4D2E7] text-[#173555]">
              <tr>
                <th className="py-2 px-4 border-b border-r border-[#173555]">Fecha/Hora</th>
                <th className="py-2 px-4 border-b border-r border-[#173555]">Temperatura(°C)</th>
                <th className="py-2 px-4 border-b border-r border-[#173555]">Humedad(%)</th>
                <th className="py-2 px-4 border-b border-r border-[#173555]">UV Index</th>
                <th className="py-2 px-4 border-b border-[#173555]">Sensor ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const isLast = index === data.length - 1;
                const borderBottom = isLast ? '' : 'border-b';

                return (
                  <tr key={index} className="hover:bg-gray-50 text-center">
                    <td className={`py-2 px-4 border-r border-[#173555] ${borderBottom}`}>{row.fecha}</td>
                    <td className={`py-2 px-4 border-r border-[#173555] ${borderBottom}`}>{row.temperatura}</td>
                    <td className={`py-2 px-4 border-r border-[#173555] ${borderBottom}`}>{row.humedad}</td>
                    <td className={`py-2 px-4 border-r border-[#173555] ${borderBottom}`}>{row.uv}</td>
                    <td className={`py-2 px-4 border-[#173555] ${borderBottom}`}>{row.sensor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center py-2 px-4 bg-[#486F99] text-white font-semibold rounded-lg shadow-md"
          >
            <img src="/downloadIcon.svg" alt="descargar" className="w-5 h-5 mr-2" />
            Descargar reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
