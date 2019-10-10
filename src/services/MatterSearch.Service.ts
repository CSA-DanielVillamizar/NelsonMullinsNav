export interface IMatter {
    id: string;
    name: string;
}

const baseUri = 'https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/cmsmatters';

const mapResultToMatter = (result: any): IMatter => ({ id: result.matter_uno, name: result.long_matt_name });

export const searchMatters = (searchTerm: string): Promise<IMatter[]> => {
    
    
    return new Promise<IMatter[]>((resolve: (matters: IMatter[]) => void, reject: (error: any) => void): void => { 

        fetch(`${baseUri}?$top=5&$orderby=long_matt_name&$inlinecount=allpages&$format=json&$select=matter_uno,long_matt_name&$filter=substringof('${searchTerm}', long_matt_name)`, 
    { 
        method: 'GET', credentials: "include" 
    })
            .then((response: any): Promise<any[]> => {
               // if (response.ok) {
                    return response.json();
                //} else {
                //    reject(response);
                    // reject (response.statusText);
             //   }
            })
            .then((matterItems: any): void => {
                resolve(matterItems.d.results.map((item: any): IMatter => mapResultToMatter(item)));
            })
            .catch((error: any): void => {
                console.log('Error in ');
                reject(error);
                // return new Promise<ITeam[]>((resolve, reject) => {
                //     reject(error);
                // });
            });

    });
}