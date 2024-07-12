import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpStatus
} from "@nestjs/common";
import {AssociationService} from './association.service';
import {CreateAssociationDto} from './dto/create-association.dto';
import {UpdateAssociationDto} from './dto/update-association.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {BadRequestResponse} from '../../common/doc-response/bad.request.response';
import {GetAssociationDto} from './dto/get-association.dto';
import {ForbiddenResponse} from '../../common/doc-response/forbidden.response';
import {Association} from './entities/association.entity';
import {DeleteResponseOk} from '../../common/doc-response/delete.response';
import {NotFoundResponse} from '../../common/doc-response/not.found.response';

@ApiTags('Association')
@Controller({path: "association", version: '1'})
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Post()
  @ApiOperation({summary: 'Create a association'})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Created",
    type: GetAssociationDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
    type: BadRequestResponse
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: "Forbidden",
    type: ForbiddenResponse
  })
  @UsePipes(new ValidationPipe({transform: true}))
  create(@Body() createAssociationDto: CreateAssociationDto): Promise<Association> {
    return this.associationService.create(createAssociationDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all associations'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Ok",
    type: GetAssociationDto,
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Forbidden",
    type: ForbiddenResponse
  })
  findAll(): Promise<Association[]> {
    return this.associationService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Ok",
    type: GetAssociationDto
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Forbidden",
    type: ForbiddenResponse
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Not found",
    type: NotFoundResponse
  })
  @ApiOperation({summary: 'Get a association by id'})
  findOne(@Param('id') id: string): Promise<Association> {
    return this.associationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a association'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Ok",
    type: GetAssociationDto
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Forbidden",
    type: ForbiddenResponse
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Not found",
    type: NotFoundResponse
  })
  @UsePipes(new ValidationPipe({transform: true}))
  update(@Param('id') id: string, @Body() updateAssociationDto: UpdateAssociationDto) {
    return this.associationService.update(+id, updateAssociationDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a association'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Ok",
    type: DeleteResponseOk
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Not found",
    type: NotFoundResponse
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Forbidden",
    type: ForbiddenResponse
  })
  remove(@Param('id') id: string): Promise<DeleteResponseOk> {
    return this.associationService.remove(+id);
  }
}
