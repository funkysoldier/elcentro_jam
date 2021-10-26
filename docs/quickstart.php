<?php
require __DIR__ . '/vendor/autoload.php';

/*if (php_sapi_name() != 'cli') {
    throw new Exception('This application must be run on the command line.');
}*/

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Google Sheets API PHP Quickstart');
    $client->setScopes(Google_Service_Sheets::SPREADSHEETS);
    $client->setAuthConfig('credentials.json');
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            //printf("Open the following link in your browser:\n<a href=\"%s\">click</a>\n", $authUrl); return;
//            print 'Enter verification code: ';
            $authCode = "4/xAF-bPNiEHIhHM44b6WqW0kA869R7PfmoVDLK-2f7t4rUh8ptVovPu0";//trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}

function regMe($aa){
  
// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Sheets($client);

$spreadsheetId = '1jHiS8vUqB-g0NTxzdTzGa2DOMFlQMVirC-qFm8ZMw_Y';
$range = 'Регистрации!A1:A';
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

$range = "Регистрации!A".(count($values)+1);

//if (empty($values)) {
//    print "No data found.\n";
//} else {
//    foreach ($values as $row)
//	print_r ($row)."<br />";
//}

$valueInputOption = "RAW";
$body = new Google_Service_Sheets_ValueRange([
    'values' => array($aa)
]);
$params = [
    'valueInputOption' => $valueInputOption
];
$result = $service->spreadsheets_values->update($spreadsheetId, $range, $body, $params);
return $result->getUpdatedCells();
}
