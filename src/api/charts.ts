import express from 'express'
import { PriceQuote as priceModel } from '../mongoose/schemas/index'
import { Order as orderModel } from '../mongoose/schemas/index'

const router = express.Router()

router.get('/charts/price-quotes/:startdate/:finaldate', async (req, res) => {
  try {
    const startDate = req.params.startdate
    const endDate = req.params.finaldate

    const sales = await priceModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Crie um objeto para mapear os totais de vendas por mês
    const salesPerMonth: any = {};

    sales.forEach((sale: any) => {
      const createdAt = new Date(sale.createdAt);
      const months = createdAt.getMonth() + 1; // +1 porque os meses são indexados a partir de 0
      const year = createdAt.getFullYear();
      const monthYear = `${months}/${year}`;

      if (!salesPerMonth[monthYear]) {
        salesPerMonth[monthYear] = 0;
      }

      salesPerMonth[monthYear] += sale.total;
    });

    const keysMonths = Object.keys(salesPerMonth);
    const saleTotals = keysMonths.map((mes) => salesPerMonth[mes]);

    const pairsMonthTotal = keysMonths.map((month, index) => ({
      month: month,
      total: saleTotals[index],
    }));

    // Ordene os pares com base no mês
    pairsMonthTotal.sort((a, b) => {
      const [mounthA, yearA] = a.month.split('/').map(Number);
      const [mounthB, yearB] = b.month.split('/').map(Number);

      if (yearA === yearB) {
        return mounthA - mounthB;
      } else {
        return yearA - yearB;
      }
    });

    // Extraia os meses e totais ordenados
    const sortedMonths = pairsMonthTotal.map((pair) => pair.month);
    const sortedTotals = pairsMonthTotal.map((pair) => pair.total);

    res.json({ totals: sortedTotals, months: sortedMonths });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as vendas.' });
  }
});

router.get('/charts/orders/:startdate/:finaldate', async (req, res) => {
  try {
    const startDate = req.params.startdate
    const endDate = req.params.finaldate

    const sales = await orderModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Crie um objeto para mapear os totais de vendas por mês
    const salesPerMonth: any = {};

    sales.forEach((sale: any) => {
      const createdAt = new Date(sale.createdAt);
      const months = createdAt.getMonth() + 1; // +1 porque os meses são indexados a partir de 0
      const year = createdAt.getFullYear();
      const monthYear = `${months}/${year}`;

      if (!salesPerMonth[monthYear]) {
        salesPerMonth[monthYear] = 0;
      }

      salesPerMonth[monthYear] += sale.total;
    });

    const keysMonths = Object.keys(salesPerMonth);
    const saleTotals = keysMonths.map((mes) => salesPerMonth[mes]);

    const pairsMonthTotal = keysMonths.map((month, index) => ({
      month: month,
      total: saleTotals[index],
    }));

    // Ordene os pares com base no mês
    pairsMonthTotal.sort((a, b) => {
      const [mounthA, yearA] = a.month.split('/').map(Number);
      const [mounthB, yearB] = b.month.split('/').map(Number);

      if (yearA === yearB) {
        return mounthA - mounthB;
      } else {
        return yearA - yearB;
      }
    });

    // Extraia os meses e totais ordenados
    const sortedMonths = pairsMonthTotal.map((pair) => pair.month);
    const sortedTotals = pairsMonthTotal.map((pair) => pair.total);

    res.json({ totals: sortedTotals, months: sortedMonths });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as vendas.' });
  }
});

export { router as chartsRoutes }

