import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  private prisma: PrismaClient;
  constructor(private readonly appService: AppService) {
    this.prisma = new PrismaClient();
  }

  @Get()
  async getHello(): Promise<object> {
    await this.prisma.user.create({
      data: {
        name: 'Admin',
        type: 1,
      },
    });
    const response = await this.prisma.user.findMany();
    return {
      message: this.appService.getHello(),
      state: response,
    };
  }

  @Post('/login')
  async makeLogin(@Body() login: { id: number }) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: login.id,
      },
    });

    if (!user)
      return {
        error: true,
        code: 404,
      };

    return user;
  }

  @Post('/product')
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    const response = await this.prisma.product.create({
      data: createProductDTO,
    });

    return response;
  }

  @Get('/product')
  async getProducts() {
    return await this.prisma.product.findMany();
  }

  @Post('/sale')
  async makeSale(@Body() createSaleDTO: CreateSaleDTO) {
    const sale = await this.prisma.sale.create({
      data: {
        customerCpf: createSaleDTO.customerCPF,
      },
    });

    const data = createSaleDTO.productsIds.map((id) => ({
      saledId: sale.id,
      productId: id,
    }));

    const res = await this.prisma.saleItem.createMany({
      data: data,
    });

    return res;
  }
}

type CreateProductDTO = {
  name: string;
  value: number;
  amount: number;
};

type CreateSaleDTO = {
  productsIds: number[];
  customerCPF: string;
};

// type Response = {
//   message: string;
//   state: object;
// }
