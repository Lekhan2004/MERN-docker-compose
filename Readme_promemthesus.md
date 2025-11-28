Go to kuber/k8s branch

```sh
git checkout kuber/k8s
```
Install Prom
```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/prometheus -n monitoring
```

go to http://backend-service:5050/metrics on the backend endpoint and check for prom


Install Graphana

```sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install grafana grafana/grafana -n monitoring
```

Note: Make sure you have metadata for both cases 

Get Graphana Admin Pass

```sh
kubectl get secret grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```
Step 3: Access Grafana UI
```sh
kubectl port-forward svc/grafana 3000:80 -n monitoring
```

3. Connect Grafana to Prometheus

Inside Grafana:

    1.Go to Configuration → Data sources.
    2.Click Add data source.
    3.Choose Prometheus.

Set the URL:

    Inside cluster (if Grafana and Prometheus in same namespace and using Service):
    http://prometheus-server.monitoring.svc.cluster.local
    or simply
    http://prometheus-server (depending on Service name)

If using Helm: often prometheus-server Service name in monitoring namespace.

Once data source is set:
    1.Go to Dashboards → Import.
    2.You can import official dashboards by ID