import {Component} from '@angular/core';

// Form
import {Validators, FormControl, FormGroup} from '@angular/forms';

// Needed for AG Grid
import {HttpClient} from '@angular/common/http';
import {ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {CellClickedEvent, ColDef, GridReadyEvent} from 'ag-grid-community';
import {Observable} from 'rxjs';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {RowNode, Column} from "ag-grid-community";


@Component({
  selector: 'app-anagrafica-base-NOTUSED',
  templateUrl: './anagrafica-base.component.html',
  styleUrls: ['./anagrafica-base.component.css']
})
export class AnagraficaBaseComponent {
  constructor(private http: HttpClient) {
  }

  // Data that gets displayed in the grid
  public rowData$!: any[];

  // --------------------- GRID ---------------------

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {field: 'make', headerName: 'Marca'},
    {field: 'model', headerName: 'Modello'},
    {field: 'price', headerName: 'Prezzo'}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    hide: false,
    cellDataType: false,
    flex: 1
  };

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from server
  onGridReady(params: GridReadyEvent) {

    var body = new FormData()
    body.append('obtain', 'true');

    this.http.post<ResultAJAX>('/data/getdata', body).subscribe(result => {
      this.rowData$ = result.output;
    });
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  // --------------------- FORM ---------------------

  formAutomobili: FormGroup = new FormGroup({
    inputMarca: new FormControl('Marca', [Validators.required]),
    inputModello: new FormControl(),
    inputPrezzo: new FormControl(),
  });

  openModal(): void {
    ($('#modaleDocenti') as any).modal('show')
  }
}

interface ResultAJAX {
  msg: string,
  output: any[]
}
