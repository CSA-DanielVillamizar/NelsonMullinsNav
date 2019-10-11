import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface ITeam {
    id: number;
    title: string;
}

export interface ITeamItem{
    Id: number;
    Title: string;
}



const teamsList = '176799b5-1e0b-42bc-9e11-778f85851935';
const mapSPResultToTeam = (spResult: ITeamItem): ITeam => ({ id: spResult.Id, title: spResult.Title });

export const fetchTeamsx = (context: ApplicationCustomizerContext): Promise<ITeam[]> => {

    let listUrl = `${

        context.pageContext.site.absoluteUrl
        }/_api/web/lists('${teamsList}')/items`;


    return new Promise<ITeam[]>((resolve: (teams: ITeam[]) => void, reject: (error: any) => void): void => { 

        context.spHttpClient
            .get(listUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse): Promise<ITeamItem[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response);
                    // reject (response.statusText);
                }
            })
            .then((teamItems: any): void => {
                resolve(teamItems.value.map((item: ITeamItem): ITeam => mapSPResultToTeam(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting teams');
                reject(error);
            });

    });
}

export interface IOffice {
    id: string;
    name: string;
}

export interface IManagementGroup {
    id: string;
    name: string;
}

export interface ITeamEntry {
    id: string;
    name: string;
}

export interface ICommittee{
    id: string;
    name: string;
}

export interface IAdministration{
    id: string;
    name: string;
}

export const fetchManagementGroups = (): Promise<IManagementGroup[]> => {

    return new Promise<IManagementGroup[]>((resolve: (offices: IManagementGroup[]) => void, reject: (error: any) => void): void => {

        resolve([{
            "id": '1',
            "name": "Corporate",
        },
        {
            "id": '2',
            "name": "Litigation"
        },
        {
            "id": "3",
            "name": "Government Relations"
        },
        {
            "id": "4",
            "name": "Intellectual Property"
        }]);
    });
}

export const fetchTeams = (): Promise<ITeamEntry[]> => {

    return new Promise<ITeamEntry[]>((resolve: (teams: ITeamEntry[]) => void, reject: (error: any) => void): void => {

        resolve([{
            "id": "1",
            "name": "Affordable Housing and Tax Credit"
        },
        {
            "id": "2",
            "name": "Bill Hogan Team"
        },
        {
            "id": "3",
            "name": "Business and Distribution Litigation Team"
        },
        {
            "id": "4",
            "name": "Capital Markets"
        },
        {
            "id": "5",
            "name": "Chris Daniels Team"
        },
        {
            "id": "6",
            "name": "Commercial Litigation - Central / North Florida"
        },
        {
            "id": "7",
            "name": "Commercial Litigation - South Florida"
        },
        {
            "id": "8",
            "name": "Construction Law & Litigation"
        },
        {
            "id": "9",
            "name": "Consumer and Business Litigation Team"
        },
        {
            "id": "10",
            "name": "Corporate & Finance"
        },
        {
            "id": "11",
            "name": "Corporate and Private Equity"
        },
        {
            "id": "12",
            "name": "Corporate and Real Estate"
        },
        {
            "id": "13",
            "name": "David Dukes Team"
        },
        {
            "id": "14",
            "name": "Education Counsel"
        },
        {
            "id": "15",
            "name": "Education Counsel"
        },
        {
            "id": "16",
            "name": "Eminent Domain"
        },
        {
            "id": "17",
            "name": "Encompass"
        },
        {
            "id": "18",
            "name": "Energy"
        },
        {
            "id": "19",
            "name": "Estate Planning & Trusts"
        },
        {
            "id": "20",
            "name": "Federal / State Policy Team"
        },
        {
            "id": "21",
            "name": "Financial Regulatory and Corporate"
        },
        {
            "id": "22",
            "name": "Florida Real Estate Team - South"
        }]);
    });
}

const mapResultToCommittee = (result: any): IOffice => ({ id: result.id, name: result.title });
export const fetchCommittees = (): Promise<ICommittee[]> => {

    return new Promise<IOffice[]>((resolve: (offices: ICommittee[]) => void, reject: (error: any) => void): void => {

        fetch(`https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/nmrs_committees?&$orderby=title&$inlinecount=allpages&$format=json&$select=id,title`,            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then((officeItems: any): void => {
                resolve(officeItems.d.results.map((item: any): ICommittee => mapResultToCommittee(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting committees');
                reject(error);
            });
    });
}

const mapResultToOffice = (result: any): IOffice => ({ id: result.spid, name: result.name });
export const fetchOffices = (): Promise<IOffice[]> => {

    return new Promise<IOffice[]>((resolve: (offices: IOffice[]) => void, reject: (error: any) => void): void => {

        fetch(`https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/hcp_offices?&$orderby=name&$inlinecount=allpages&$format=json&$select=spid,name`,
            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then((officeItems: any): void => {
                resolve(officeItems.d.results.map((item: any): IOffice => mapResultToOffice(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting offices');
                reject(error);
            });
    });
}

export const fetchAdministration = (): Promise<IAdministration[]> => {

    return new Promise<IAdministration[]>((resolve: (offices: IAdministration[]) => void, reject: (error: any) => void): void => {

        resolve([{
            "id": "1",
            "name": "Accounting"
        },
        {
            "id": "2",
            "name": "Administrative Assistants"
        },
        {
            "id": "3",
            "name": "Business Development"
        },
        {
            "id": "4",
            "name": "Document Services"
        },
        {
            "id": "5",
            "name": "Facilities & Contract Services"
        },
        {
            "id": "6",
            "name": "Human Resources"
        },
        {
            "id": "7",
            "name": "Information Technology"
        },
        {
            "id": "8",
            "name": "Law Clerks"
        },
        {
            "id": "9",
            "name": "Legal & Conflicts"
        },
        {
            "id": "10",
            "name": "Library"
        },
        {
            "id": "11",
            "name": "Litigation Solutions"
        },
        {
            "id": "12",
            "name": "Marketing"
        },
        {
            "id": "13",
            "name": "Operations"
        }]);
    });
}