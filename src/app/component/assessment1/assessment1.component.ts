import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-assessment1',
  templateUrl: './assessment1.component.html',
  styleUrls: ['./assessment1.component.scss']
})
export class Assessment1Component {
  data: string[] = [];

  loading: boolean = false;
  errorMessage: string = '';

  constructor(private httpService: HttpService) { }

  getDataAndDownload() {
    this.loading = true;
    this.errorMessage = "";
    this.httpService.getData()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.data = response;
          this.generateExcel();                   //generate excel
          this.loading = false;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = JSON.stringify(error);
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.log('Request completed')
          this.loading = false;
        }
      )
  }

  generateExcel(): void {
    let workbook = new Workbook();

    var worksheet = workbook.addWorksheet('My data');
    let header = ["Name"]
    worksheet.addRow(header);

    for (let i of this.data) {
      worksheet.addRow([i])
    }

    let fileName = "data.xlsx";
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer()
      .then(function (buffer: any) {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(data, fileName);
      });
  }

}
