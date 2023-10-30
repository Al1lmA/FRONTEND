export interface BankService {
    bank_service_id: number;
    title: string;
    button_text: string;
    short_description: string;
    description: string;
    img: string;
    service_status: string;
    image: string;

    // bank_service_id = models.AutoField(primary_key=True)
    // title = models.CharField(blank=True, null=True)
    // button_text = models.CharField(blank=True, null=True)
    // short_description = models.CharField(blank=True, null=True)
    // description = models.TextField(blank=True, null=True)
    // img = models.CharField(blank=True, null=True)
    // order_img = models.CharField(blank=True, null=True)
    // service_status = models.CharField(max_length=20, default='действует')  
}

export interface BankServiceResult {
    service: BankService[] | null; 
}

export const GetService = async (bank_service_id: number): Promise<BankServiceResult> => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/services/${bank_service_id}/`);
        if (!response.ok) {
            throw new Error('Запрос незадался!');
        }
        const data: BankService = await response.json();
        return {
            service: [data],
        };
    } catch (error) {
        console.error('Ошибка запроса штрафа:', error);
        return {
            service: null,
        };
    }
};